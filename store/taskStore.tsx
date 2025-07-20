import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    date: Date;
};

export type RunningTask = {
    taskId: string;
    startTime: Date;
    elapsedTime: number; // in seconds
};

type TaskStore = {
    tasks: Task[];
    nextId: number;
    selectedDate: Date;
    runningTask: RunningTask | null;
    addTask: (title: string, description: string, completed: boolean, date?: Date) => void;
    toggleTaskCompleted: (id: string) => void;
    deleteTask: (id: string) => void;
    setSelectedDate: (date: Date) => void;
    startTask: (taskId: string) => void;
    stopTask: () => void;
    updateElapsedTime: (elapsedTime: number) => void;
};

export const useTaskStore = create(persist<TaskStore>((set) => ({
    tasks: [],
    nextId: 1,
    selectedDate: new Date(),
    runningTask: null,
    addTask: (title, description, completed, date) => {
        set((state) => ({
            ...state,
            nextId: state.nextId + 1,
            tasks: [
                {
                    id: String(state.nextId),
                    title,
                    description,
                    completed,
                    date: date || state.selectedDate,
                },
                ...state.tasks,
            ],
        }));
    },
    toggleTaskCompleted: (id) => {
        set((state) => ({
            ...state,
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ),
        }));
    },
    deleteTask: (id) => {
        set((state) => ({
            ...state,
            tasks: state.tasks.filter((task) => task.id !== id),
        }));
    },
    setSelectedDate: (date) => {
        set((state) => ({
            ...state,
            selectedDate: date,
        }));
    },
    startTask: (taskId) => {
        set((state) => ({
            ...state,
            runningTask: {
                taskId,
                startTime: new Date(),
                elapsedTime: 0,
            },
        }));
    },
    stopTask: () => {
        set((state) => ({
            ...state,
            runningTask: null,
        }));
    },
    updateElapsedTime: (elapsedTime) => {
        set((state) => ({
            ...state,
            runningTask: state.runningTask ? {
                ...state.runningTask,
                elapsedTime,
            } : null,
        }));
    },
}), {
    name: "task-storage",
    storage: createJSONStorage(() => AsyncStorage),
    onRehydrateStorage: () => (state) => {
        if (state) {
            if (state.tasks) {
                state.tasks = state.tasks.map(task => ({
                    ...task,
                    date: typeof task.date === 'string' ? new Date(task.date) : task.date
                }));
            }
            if (state.selectedDate) {
                state.selectedDate = typeof state.selectedDate === 'string' ? new Date(state.selectedDate) : state.selectedDate;
            }
            if (state.runningTask && state.runningTask.startTime) {
                state.runningTask.startTime = typeof state.runningTask.startTime === 'string' ? new Date(state.runningTask.startTime) : state.runningTask.startTime;
            }
        }
    },
}
));
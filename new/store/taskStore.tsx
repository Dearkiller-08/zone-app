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

type TaskStore = {
    tasks: Task[];
    nextId: number;
    selectedDate: Date;
    addTask: (title: string, description: string, completed: boolean, date?: Date) => void;
    toggleTaskCompleted: (id: string) => void;
    deleteTask: (id: string) => void;
    setSelectedDate: (date: Date) => void;
};

export const useTaskStore = create(persist<TaskStore>((set) => ({
    tasks: [],
    nextId: 1,
    selectedDate: new Date(),
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
        }
    },
}
));
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
};

type TaskStore = {
    tasks: Task[];
    nextId: number;
    addTask: (title: string, description: string, completed: boolean) => void;
    toggleTaskCompleted: (id: string) => void;
    deleteTask: (id: string) => void;
};

const initialTasks: Task[] = [
    {
        id: "1",
        title: "Sample Task 1",
        description: "This is a sample task description.",
        completed: false,
    },
    {
        id: "2",
        title: "Sample Task 2",
        description: "This is another sample task description.",
        completed: true,
    },
    {
        id: "3",
        title: "Sample Task 3",
        description: "This is yet another sample task description.",
        completed: false,
    },
    {
        id: "4",
        title: "Sample Task 4",
        description: "This is a sample task description.",
        completed: false,
    },
    {
        id: "5",
        title: "Sample Task 5",
        description: "This is another sample task description.",
        completed: true,
    },
    {
        id: "6",
        title: "Sample Task 6",
        description: "This is yet another sample task description.",
        completed: false,
    },
    {
        id: "7",
        title: "Sample Task 7",
        description: "This is a sample task description.",
        completed: false,
    },
    {
        id: "8",
        title: "Sample Task 8",
        description: "This is another sample task description.",
        completed: true,
    },
    {
        id: "9",
        title: "Sample Task 9",
        description: "This is yet another sample task description.",
        completed: false,
    },
];

export const useTaskStore = create(persist<TaskStore>((set) => ({
    tasks: [],
    nextId: 1,
    addTask: (title, description, completed) => {
        set((state) => ({
            ...state,
            nextId: state.nextId + 1,
            tasks: [
                {
                    id: String(state.nextId),
                    title,
                    description,
                    completed,
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
}), {
    name: "task-storage", // unique name for the storage
    storage: createJSONStorage(() => AsyncStorage),
}
));
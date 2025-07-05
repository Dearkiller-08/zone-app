import { create } from "zustand";

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
};


export const useTaskStore = create<TaskStore & { toggleTaskCompleted: (id: string) => void }>((set) => ({
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
}));
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type NotificationKind = 'upcoming_task_start' | 'task_completed';

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body?: string;
  createdAt: number;
  read: boolean;
  taskId?: string;
}

interface NotificationStore {
  notifications: AppNotification[];
  addNotification: (n: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clear: () => void;
}

export const useNotificationStore = create(persist<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (n) => set((state) => ({
    notifications: [
      {
        id: Math.random().toString(36).slice(2),
        createdAt: Date.now(),
        read: false,
        ...n,
      },
      ...state.notifications,
    ].slice(0, 200), // cap list
  })),
  markRead: (id) => set((state) => ({
    notifications: state.notifications.map(notif => notif.id === id ? { ...notif, read: true } : notif)
  })),
  markAllRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),
  clear: () => set({ notifications: [] }),
}), {
  name: 'notification-storage',
  storage: createJSONStorage(() => AsyncStorage),
}));

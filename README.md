# Zone App v1

A lightweight task planning & focus tracking mobile app built with Expo Router, React Native, TypeScript, and Zustand. It provides a calendar-centric daily task list, persistence, basic time tracking for a running task, and local in‑app notification state (ready for integration with push notifications).

## Features

- Horizontal scrolling calendar to pick a day and view its tasks
- Daily task list filtered by the selected date
- Create tasks with title, description, date (defaults to selected day)
- Toggle completion & reorder logic (incomplete tasks float to top)
- Local persisted state with Zustand + AsyncStorage (tasks & notifications)
- Time tracking metadata for a single running task (start/stop + elapsed seconds)
- In‑app notification store (upcoming task start, task completed placeholders)
- Layout animations on date change for a smoother UX
- TypeScript throughout for safer refactors

## Tech Stack

- **Expo 54 / React Native 0.81** with **Expo Router** for file‑system based navigation
- **TypeScript** for static typing
- **Zustand** (with `persist` + AsyncStorage) for state management
- **date-fns** for date utilities
- **Expo Notifications / Device / Constants** (scaffolded for permission + future push logic)
- **ESLint + Prettier** for linting & formatting

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run start
   ```
   Then press a (Android), i (iOS simulator on macOS), or w (Web) in the Expo CLI.

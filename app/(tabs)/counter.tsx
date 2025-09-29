import { Text, View, StyleSheet, TouchableOpacity, Alert, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Duration, intervalToDuration, add } from "date-fns";
import { TimeSegment } from "../../component/TimeSegment";
import { getFromStorage, saveToStorage } from "../../utils/storage";
import * as Haptics from "expo-haptics";
import ConfettiCannon from "react-native-confetti-cannon";
import { useTaskStore } from "../../store/taskStore";

export const taskTimerStorageKey = "task-timer-state";

export type PersistedTimerState = {
  currentNotificationId: string | undefined;
  taskId: string;
  startTime: number;
  totalElapsed: number;
  isRunning: boolean;
}

type TimerStatus = {
  duration: Duration;
}

export default function Counter() {
  const router = useRouter();
  const confettiRef = useRef<any>(undefined);
  const { width } = useWindowDimensions();
  const [timerState, setTimerState] = useState<PersistedTimerState | null>(null);
  const [status, setStatus] = useState<TimerStatus>({ duration: {} });
  
  const tasks = useTaskStore((state) => state.tasks);
  const runningTask = useTaskStore((state) => state.runningTask);
  const stopTask = useTaskStore((state) => state.stopTask);
  const toggleTaskCompleted = useTaskStore((state) => state.toggleTaskCompleted);

  const currentTask = runningTask ? tasks.find(t => t.id === runningTask.taskId) : null;
    
  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(taskTimerStorageKey);
      if (runningTask) {
        if (value && value.taskId === runningTask.taskId && value.isRunning) {
          setTimerState(value);
          const now = Date.now();
          const elapsed = Math.floor((now - value.startTime) / 1000) + value.totalElapsed;
          const duration = intervalToDuration({ start: 0, end: elapsed * 1000 });
          setStatus({ duration });
        } else {
          const newState: PersistedTimerState = {
            currentNotificationId: undefined,
            taskId: runningTask.taskId,
            startTime: runningTask.startTime.getTime(),
            totalElapsed: 0,
            isRunning: true,
          };
          setTimerState(newState);
          await saveToStorage(taskTimerStorageKey, newState);
          setStatus({ duration: intervalToDuration({ start: 0, end: 0 }) });
        }
      } else {
        setTimerState(null);
      }
    };

    init();
  }, [runningTask]);
  
  useEffect(() => {
    if (!timerState?.isRunning) return;

    const intervalId = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - timerState.startTime) / 1000) + timerState.totalElapsed;
      
      const duration = intervalToDuration({
        start: 0,
        end: elapsed * 1000
      });

      setStatus({ duration });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerState]);

  const handleCompleteTask = async () => {
    if (!currentTask || !timerState) return;

    confettiRef.current?.start();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    let pushNotificationId;
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {      
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Completed! 🎉",
          body: `Great job completing "${currentTask.title}"!`,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2,
        },
      });
    }

    if (timerState.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(timerState.currentNotificationId);
    }

    toggleTaskCompleted(currentTask.id);
    
    stopTask();
    setTimerState(null);
    await saveToStorage(taskTimerStorageKey, null);
    router.replace('/(tabs)/(home)');
  };

  const handleStopTimer = async () => {
    if (!timerState) return;
    const currentElapsed = Math.floor((Date.now() - timerState.startTime) / 1000) + timerState.totalElapsed;
    const updatedState = {
      ...timerState,
      totalElapsed: currentElapsed,
      isRunning: false,
    };
    
    setTimerState(updatedState);
    await saveToStorage(taskTimerStorageKey, updatedState);
    stopTask();
    router.replace('/(tabs)/(home)');
  };
    
  if (!currentTask || !timerState) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Active Task</Text>
          <Text style={styles.emptySubtitle}>Start a task from the home screen to begin timing</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.workingOnText}>Working on...</Text>
      <Text style={styles.taskTitle}>{currentTask.title}</Text>

      <View style={styles.timeContainer}>
        <TimeSegment 
          unit="Hours" 
          number={status.duration.hours ?? 0} 
        />
        <TimeSegment 
          unit="Minutes" 
          number={status.duration.minutes ?? 0} 
        />
        <TimeSegment 
          unit="Seconds" 
          number={status.duration.seconds ?? 0} 
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.button, styles.completeButton]}
          onPress={handleCompleteTask}
        >
          <Text style={styles.buttonText}>Complete Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.button, styles.stopButton]}
          onPress={handleStopTimer}
        >
          <Text style={styles.buttonText}>Stop Timer</Text>
        </TouchableOpacity>
      </View>

      <ConfettiCannon 
        ref={confettiRef} 
        count={50} 
        origin={{ x: width / 2, y: -20}}
        autoStart={false} 
        fadeOut
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colorGrey,
  },
  emptySubtitle: {
    fontSize: 16,
    color: theme.colorGrey,
    textAlign: 'center',
  },
  workingOnText: {
    fontSize: 18,
    color: theme.colorGrey,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  timeContainer: {
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: theme.colorSuccessGreen,
  },
  stopButton: {
    backgroundColor: theme.colorErrorRed,
  },
  buttonText: {
    fontSize: 18,
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
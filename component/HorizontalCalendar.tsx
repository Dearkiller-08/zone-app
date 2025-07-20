import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Task } from '../store/taskStore';

interface CalendarDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  isSelected: boolean;
  isPast: boolean;
  hasTask: boolean;
  taskCount: number;
}

interface HorizontalCalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
  tasks?: Task[];
}

export default function HorizontalCalendar({ onDateSelect, selectedDate, tasks = [] }: HorizontalCalendarProps) {
  const [days, setDays] = useState<CalendarDay[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [hasInitialScrolled, setHasInitialScrolled] = useState(false);
  const [currentSelectedDate, setCurrentSelectedDate] = useState<Date>(() => {

    if (selectedDate && selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
      return selectedDate;
    }
    return new Date();

  });

  useEffect(() => {
    if (selectedDate && selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
      setCurrentSelectedDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    generateDays();
  }, [currentSelectedDate, tasks]);

  useEffect(() => {
    if (days.length > 0 && !hasInitialScrolled) {
      const todayIndex = days.findIndex(day => day.isToday);
      if (todayIndex !== -1 && scrollViewRef.current) {

        const itemWidth = 76;
        const scrollPosition = Math.max(0, (todayIndex - 0.5) * itemWidth);
        
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: scrollPosition,
            animated: true
          });
          setHasInitialScrolled(true);
        }, 100);
      }
    }
  }, [days, hasInitialScrolled]);

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const generateDays = () => {
    const today = new Date();
    const daysArray: CalendarDay[] = [];
    
    let safeSelectedDate = currentSelectedDate;
    if (!safeSelectedDate || !(safeSelectedDate instanceof Date) || isNaN(safeSelectedDate.getTime())) {
      safeSelectedDate = new Date();
      setCurrentSelectedDate(safeSelectedDate);
    }
    
    for (let i = 7; i >= 1; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      const isToday = false;
      const isPast = true;
      const isSelected = safeSelectedDate.toDateString() === date.toDateString();
      
      const tasksForDay = getTasksForDate(date);
      const hasTask = tasksForDay.length > 0;
      const taskCount = tasksForDay.length;
      
      daysArray.push({
        date,
        dayName,
        dayNumber,
        isToday,
        isSelected,
        isPast,
        hasTask,
        taskCount
      });
    }
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      const isToday = i === 0;
      const isPast = false;
      const isSelected = safeSelectedDate.toDateString() === date.toDateString();
      
      const tasksForDay = getTasksForDate(date);
      const hasTask = tasksForDay.length > 0;
      const taskCount = tasksForDay.length;
      
      daysArray.push({
        date,
        dayName,
        dayNumber,
        isToday,
        isSelected,
        isPast,
        hasTask,
        taskCount
      });
    }
    
    setDays(daysArray);
  };

  const handleDateSelect = (day: CalendarDay) => {
    setCurrentSelectedDate(day.date);
    onDateSelect?.(day.date);
    
    setDays(prevDays => 
      prevDays.map(prevDay => ({
        ...prevDay,
        isSelected: prevDay.date.toDateString() === day.date.toDateString()
      }))
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        snapToInterval={76}
        snapToAlignment="start"
        decelerationRate="fast"
        pagingEnabled={false}
      >
        {days.map((day, index) => (
          <TouchableOpacity
            key={`${day.date.toISOString()}-${index}`}
            style={[
              styles.dayContainer,
              day.isSelected && styles.selectedDayContainer,
              day.isToday && !day.isSelected && styles.todayContainer,
              day.isPast && !day.isSelected && styles.pastDayContainer
            ]}
            onPress={() => handleDateSelect(day)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.dayName,
              day.isSelected && styles.selectedText,
              day.isToday && !day.isSelected && styles.todayText,
              day.isPast && !day.isSelected && styles.pastText
            ]}>
              {day.dayName}
            </Text>
            <Text style={[
              styles.dayNumber,
              day.isSelected && styles.selectedText,
              day.isToday && !day.isSelected && styles.todayText,
              day.isPast && !day.isSelected && styles.pastText
            ]}>
              {day.dayNumber}
            </Text>
            {day.isToday && (
              <View style={[
                styles.todayIndicator,
                day.isSelected && styles.selectedTodayIndicator
              ]} />
            )}
            {day.hasTask && (
              <View style={[
                styles.taskIndicator,
                day.isSelected && styles.selectedTaskIndicator,
                day.isToday && !day.isSelected && styles.todayTaskIndicator
              ]}>
                {day.taskCount > 1 && (
                  <Text style={[
                    styles.taskCount,
                    day.isSelected && styles.selectedTaskCount
                  ]}>
                    {day.taskCount}
                  </Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    gap: 8,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: theme.colorWhite,
    borderWidth: 1,
    borderColor: theme.colorLightGrey,
    width: 68,
    position: 'relative',
  },
  selectedDayContainer: {
    backgroundColor: theme.colorBlack,
    borderColor: theme.colorBlack,
  },
  todayContainer: {
    borderColor: theme.colorSuccessGreen,
    borderWidth: 2,
  },
  pastDayContainer: {
    opacity: 0.8,
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colorGrey,
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colorBlack,
  },
  selectedText: {
    color: theme.colorWhite,
  },
  todayText: {
    color: theme.colorSuccessGreen,
  },
  pastText: {
    color: theme.colorGrey,
    opacity: 0.6,
  },
  todayIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colorSuccessGreen,
  },
  selectedTodayIndicator: {
    backgroundColor: theme.colorWhite,
  },
  taskIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colorBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTaskIndicator: {
    backgroundColor: theme.colorWhite,
  },
  todayTaskIndicator: {
    backgroundColor: theme.colorSuccessGreen,
  },
  taskCount: {
    color: theme.colorWhite,
    fontSize: 8,
    fontWeight: 'bold',
  },
  selectedTaskCount: {
    color: theme.colorBlack,
  },
});
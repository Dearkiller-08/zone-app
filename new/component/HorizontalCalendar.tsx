import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface CalendarDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  isSelected: boolean;
}

interface HorizontalCalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

export default function HorizontalCalendar({ onDateSelect, selectedDate }: HorizontalCalendarProps) {
  const [days, setDays] = useState<CalendarDay[]>([]);
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
  }, [currentSelectedDate]);

  const generateDays = () => {
    const today = new Date();
    const daysArray: CalendarDay[] = [];
    
    // Triple check to ensure we have a valid Date
    let safeSelectedDate = currentSelectedDate;
    if (!safeSelectedDate || !(safeSelectedDate instanceof Date) || isNaN(safeSelectedDate.getTime())) {
      safeSelectedDate = new Date();
      setCurrentSelectedDate(safeSelectedDate); // Update state if it was invalid
    }
    
    // Generate 30 days starting from today
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      const isToday = i === 0;
      const isSelected = safeSelectedDate.toDateString() === date.toDateString();
      
      daysArray.push({
        date,
        dayName,
        dayNumber,
        isToday,
        isSelected
      });
    }
    
    setDays(daysArray);
  };

  const handleDateSelect = (day: CalendarDay) => {
    setCurrentSelectedDate(day.date);
    onDateSelect?.(day.date);
    
    // Update the days array to reflect new selection
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
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {days.map((day, index) => (
          <TouchableOpacity
            key={`${day.date.toISOString()}-${index}`}
            style={[
              styles.dayContainer,
              day.isSelected && styles.selectedDayContainer,
              day.isToday && !day.isSelected && styles.todayContainer
            ]}
            onPress={() => handleDateSelect(day)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.dayName,
              day.isSelected && styles.selectedText,
              day.isToday && !day.isSelected && styles.todayText
            ]}>
              {day.dayName}
            </Text>
            <Text style={[
              styles.dayNumber,
              day.isSelected && styles.selectedText,
              day.isToday && !day.isSelected && styles.todayText
            ]}>
              {day.dayNumber}
            </Text>
            {day.isToday && (
              <View style={[
                styles.todayIndicator,
                day.isSelected && styles.selectedTodayIndicator
              ]} />
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
    minWidth: 60,
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
});
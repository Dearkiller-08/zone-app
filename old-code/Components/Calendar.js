import React from 'react';
import { Calendar } from 'react-native-calendars';
import { useTasks } from '../TaskContext';

const CalendarComponent = ({ changeCurrentDate, onChangement }) => {
  const { setModalcalendar, taskList } = useTasks();

  // Extract dates from taskList
  const dateList = taskList.map(task => task.task_date);

  // Convert the list of dates into an object suitable for the markedDates prop
  const markedDates = dateList.reduce((acc, date) => {
    acc[date] = { selected: true, selectedColor: 'orange' };
    return acc;
  }, {});

  const convertNumberToTwoDigit = number => {
    return number.toString().padStart(2, '0');
  };

  return (
    <Calendar

      markedDates={markedDates}

      onDayPress={day => {
        const date = `${day.year}-${convertNumberToTwoDigit(day.month)}-${convertNumberToTwoDigit(day.day)}`;
        changeCurrentDate(date);
        setModalcalendar(false);
      }}
    />
  );
};

export default CalendarComponent;

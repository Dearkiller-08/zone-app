// TaskContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from './utils/supabase';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [tempTaskList, setTempTaskList] = useState([]);
  const [filter, setFilter] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [modalCalendar, setModalcalendar] = useState(false);
  const [doneList, setDoneList] = useState([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      console.error('Error fetching tasks:', error.message);
    } else {
      setTaskList(data);
      setTempTaskList(data);
    }
  };

  const fetchFilter = async () => {
    const { data, error } = await supabase.from('task_filter').select('*');
    if (error) {
      console.error('Error fetching filters:', error.message);
    } else {
      setFilter(data);
    }
  };

  const fetchSingleFilter = async (filterId) => {
    setSelectedFilter(filterId);
    const filteredTasks = filterId === null
      ? taskList
      : taskList.filter(task => task.filter_id === filterId);
    setTempTaskList(filteredTasks);
  };

  const addTask = async (taskName, date, filterId) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ task_name: taskName, task_date: date, task_status: false, filter_id: filterId }])
      .select();
    if (error) {
      console.error('Error adding task:', error.message);
    } else {
      fetchTasks();
    }
  };

  const deleteTask = async (taskId) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);
    if (error) {
      console.error('Error deleting task:', error.message);
    } else {
      fetchTasks();
    }
  };

  const doneTask = async (taskId) => {
    const { error } = await supabase
      .from('tasks')
      .update({ task_status: true })
      .eq('id', taskId);
    if (error) {
      console.error('Error deleting task:', error.message);
    } else {
      fetchTasks();
      setDoneList(taskList.filter(task => task.task_status === true));
      console.log(doneList);
    }
  };

  const undoTask = async (taskId) => {
    const { error } = await supabase
      .from('tasks')
      .update({ task_status: false })
      .eq('id', taskId);
    if (error) {
      console.error('Error deleting task:', error.message);
    } else {
      fetchTasks();
    }
  };



  useEffect(() => {
    fetchFilter();
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{
      taskList,
      tempTaskList,
      filter,
      selectedFilter,
      currentDate,
      setCurrentDate,
      modalCalendar,
      setModalcalendar,
      doneList,
      fetchTasks,
      fetchSingleFilter,
      addTask,
      deleteTask,
      doneTask,
      undoTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};

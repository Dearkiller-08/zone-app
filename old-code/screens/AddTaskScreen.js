import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTasks } from '../TaskContext';

function AddTaskScreen({ navigation, route }) {
  const { filterList } = route.params;
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState('');
  const [label, setLabel] = useState(null);
  const { addTask, fetchTasks } = useTasks();

  const labelPressed = (id) => {
    setLabel(id);
    Keyboard.dismiss();
  };

  const handleAddTask = async () => {
    if (task.trim()) {
      await addTask(task, date.toISOString().split('T')[0], label);
      fetchTasks();
      navigation.goBack();
    } else {
      console.log('Please enter a task name');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDE49E' }}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add Task</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Ionicons name="close-circle-outline" size={50} color="black" />
          </TouchableOpacity>
        </View>

        <GestureHandlerRootView>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.textTitle}>Task:</Text>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.textField}>
                        <TextInput
                        placeholder="Enter the task"
                        placeholderTextColor="gray"
                        multiline
                        onChangeText={setTask}
                        value={task}
                        style={styles.textInput}
                        />
                    </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.textTitle}>Label:</Text>
                    <View style={styles.filterBox}>
                    {filterList.map((item) => (
                        <TouchableOpacity
                        key={item.id}
                        onPress={() => labelPressed(item.id)}
                        style={[styles.filterButton, item.id === label && styles.selectedFilterButton]}
                        >
                        <Text style={styles.filterText}>{item.filter_name}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="add-circle" size={20} color="black" />
                    </TouchableOpacity>
                    </View>
                    <Text style={styles.textTitle}>Due Date:</Text>
                    <View style={styles.dateBox}>
                    <DateTimePicker
                    style={styles.datePicker}
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={(event, selectedDate) => setDate(selectedDate || date)}
                    />

                    </View>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#003285',
  },
  closeButton: {
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
    color: '#003285',
  },
  textField: {
    height: 80,
    borderWidth: 1,
    borderColor: '#6DC5D1',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#003285',
  },
  filterBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    width: '100%',
    gap: 5,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#6DC5D1',
    borderRadius: 5,
    padding: 10,
  },
  selectedFilterButton: {
    backgroundColor: '#6DC5D1',
  },
  filterText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },

  dateBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },

  datePicker: {
    alignSelf: 'left',
    
}
});

export default AddTaskScreen;


import { useEffect, useState } from 'react';
import { GestureHandlerRootView, Swipeable  } from 'react-native-gesture-handler';
import { Alert, TouchableWithoutFeedback, Text, View, TouchableOpacity, Modal, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../TaskContext';
import CalendarComponent from '../Components/Calendar';
import { StatusBar } from 'expo-status-bar';

function HomeScreen({ navigation }) {

  const [showProfileModal, setShowProfileModal] = useState(false);

  const {
    taskList,
    fetchTasks,
    fetchSingleFilter,
    filter,
    currentDate,
    setCurrentDate,
    modalCalendar,
    setModalcalendar,
    selectedFilter,
    doneList,
    tempTaskList,
    doneTask,
    deleteTask,
    undoTask,
  } = useTasks();

  useEffect(() => {
    fetchTasks();
    navigation.setOptions({ fetchTasks });
  }, []);



  const renderRightActions = (task) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(task.id)}
      >
        <Ionicons name="trash-outline" size={40} color="red" />
      </TouchableOpacity>
    );
  };

  const handleDelete = (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(taskId);
            fetchTasks();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const currentTaskList = taskList.filter(task => task.task_date === currentDate);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#6DC5D1' }}>

      <View style={styles.homeScreenContainer}>

        <Modal
          visible={showProfileModal}
          animationType="slide"
          statusBarTranslucent
          hardwareAccelerated
          transparent={true}
        >
      
          <View style={{ flex: 1 , marginTop: 140, backgroundColor: 'rgba(0, 0, 0, 0.5)',  borderRadius: 50}}>
              <View style={{flex: 1, backgroundColor: 'white', borderRadius: 20}}>
                  <View style={{ margin: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <Text style={{fontSize: 50, fontWeight: 'bold', color: '#003285'}}>Profile</Text>
                      <TouchableOpacity
                        onPress={() => setShowProfileModal(false)}
                      >
                        <Ionicons name="close-circle-outline" size={50} color="black" />
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center', gap: 5, marginTop: 20}}>
                      <View>
                        <Ionicons name="person-circle-outline" size={100} color="#003285" />
                      </View>
                      <Text style={{fontSize: 30, fontWeight: 'bold', color: '#003285', marginTop: 5}}>John Doe</Text>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center', gap: 5, marginTop: 20}}>
                      <Ionicons name="globe-outline" size={30} color="#003285" />
                      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#003285', marginTop: 5}}>http://example.com</Text>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center', gap: 5, marginTop:   100}}>
                      <TouchableOpacity 
                      style={{backgroundColor: 'tomato' ,borderRadius: 10, width: 150, alignItems: 'center', justifyContent: 'center', height: 50, borderWidth: 3, borderColor: 'red'}}
                      onPress={() => console.log('disconnect')}
                      >
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Disconnect</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              </View>
          </View>

        </Modal>


        <Modal
          visible={modalCalendar}
          transparent={true}
          animationType="slide"
          statusBarTranslucent
          hardwareAccelerated
        >
          <View style={styles.modalContainer}>
            <View style={{ backgroundColor: '#FF5F00' }}>
              <View style={styles.modalBox}>
                <Text style={styles.modalText}>Calendar</Text>
                <TouchableOpacity onPress={() => setModalcalendar(!modalCalendar)}>
                  <Ionicons name="close-circle-outline" size={50} color="#002379" />
                </TouchableOpacity>
              </View>
              <CalendarComponent onChangement={fetchTasks} changeCurrentDate={setCurrentDate} />
            </View>
          </View>
        </Modal>
        <View style={styles.titleContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap:0 }}>
            <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#002379', opacity: 0.2 }}>
            Z</Text>
            <TouchableOpacity
              onPress={() => setShowProfileModal(true)}
            >
              <Ionicons name="person-circle-outline" size={50} color="#002379" />
            </TouchableOpacity>
            <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#002379', opacity: 0.2 }}>NE</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
            >
              <Ionicons name="notifications-outline" size={50} color='#002379' />
              <View style={{ height: 20, width: 20, borderRadius: '100%', backgroundColor: 'red', position: 'absolute', top: 0, right: 4 }}></View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate('Add Task', { filterList: filter })}
            >
              <Ionicons name="add-circle-outline" size={50} color='#002379' />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.cardBox} onPress={() => setModalcalendar(!modalCalendar)}>
          <Text style={{ fontSize: 20, color: '#FFFAE6' }}>{currentDate}</Text>
          <View style={{ flexDirection: 'row' , alignItems: 'center', justifyContent: 'space-between'}}>
            <Ionicons name="calendar-outline" size={30} color="#FFFAE6" />
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FFFAE6', alignSelf: 'flex-end' }}>{doneList.length} / {currentTaskList.length} Tasks</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25, color: '#002379' }}>Today's tasks</Text>
        </View>
        <View style={styles.filterBox}>
          <TouchableOpacity
            onPress={() => fetchSingleFilter(null)}
            style={[styles.cardBox, { marginRight: 3, borderRadius: 5, height: 50, backgroundColor: selectedFilter === null ? '#FDE49E' : '#FEB941' }]}
          >
            <Text style={{ color: '#002379', fontWeight: 'bold' }}>All</Text>
          </TouchableOpacity>
          <GestureHandlerRootView>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={filter}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => fetchSingleFilter(item.id)}
                  style={[styles.cardBox, { borderRadius: 5, height: 50, marginRight: 3 }, selectedFilter === item.id ? { backgroundColor: '#FDE49E' } : { backgroundColor: '#FEB941' }]}
                >
                  <Text style={{ color: '#002379', fontWeight: 'bold' }}>{item.filter_name}</Text>
                </TouchableOpacity>
              )}
            />
          </GestureHandlerRootView>
        </View>
        <View style={{ flex: 1, marginTop: 20 }}>
          <GestureHandlerRootView>
            {tempTaskList.length > 0 &&
              (selectedFilter === null
                ? tempTaskList.filter(task => task.task_date === currentDate).length > 0
                : tempTaskList.filter(task => task.task_date === currentDate && task.filter_id === selectedFilter).length > 0
              ) ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                data={selectedFilter === null
                  ? tempTaskList.filter(task => task.task_date === currentDate)
                  : tempTaskList.filter(task => task.task_date === currentDate && task.filter_id === selectedFilter)
                }
                renderItem={({ item }) => (
                  <Swipeable
                    renderRightActions={() => renderRightActions(item)}
                  >
                    <View style={[styles.taskContainer, { backgroundColor: item.task_status === true ? 'lightgrey' : '#FDE49E' }]}>
                      <Text style={{ color: '#002379', fontWeight: 'bold', textDecorationLine: item.task_status === true ? 'line-through' : 'none' }}>{item.task_name}</Text>
                      { item.task_status !== true ? 
                      <View>
                        <Ionicons name="checkmark-circle-outline" size={30} color="lightgreen" onPress={() => { doneTask(item.id) }} />
                      </View>
                      :
                      <View>
                        <Ionicons name="arrow-undo-outline" size={30} color="red" onPress={() => { undoTask(item.id) }} />
                      </View>
                      }
                    </View>
                  </Swipeable>
                )}
              />
            ) : (
              <View style={styles.noTaskContainer}>
                <Ionicons name="clipboard-outline" size={150} color="#002379" style={{ opacity: 0.5 }} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', opacity: 0.5, margin: 20, color: '#002379' }}>No tasks</Text>
              </View>
            )}
          </GestureHandlerRootView>
        </View>
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="#002379" />
    </SafeAreaView>
  );
}

const styles = {
  titleContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeScreenContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor : '#6DC5D1',
  },
  cardBox: {
    borderWidth: 1,
    backgroundColor: '#002379',
    height: 120,
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-between',
  },
  taskContainer: {
    backgroundColor: '#FFFAE6',
    borderWidth: 2,
    borderColor: '#002379',
    // borderRadius: 5,
    padding: 20,
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterBox: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6DC5D1',
  },
  modalBox: {
    padding: 20,
    borderRadius: 10,
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noTaskContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
    borderRadius: 5,
  }
};

export default HomeScreen;

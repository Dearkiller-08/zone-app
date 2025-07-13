import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, LayoutAnimation } from "react-native";
import TaskCard from "../../component/TaskCard";
import { theme } from "../../theme";
import { Task, useTaskStore } from "../../store/taskStore";

import AntDesign from '@expo/vector-icons/AntDesign';
import { useMemo } from "react";


export default function App() {
  const tasks = useTaskStore((state) => state.tasks);

  const orderTasks = (taskList: Task[]) => {
    return taskList.sort((task1: Task, task2: Task) => {
      if (task1.completed === task2.completed) {
        const id1 = typeof task1.id === 'string' ? parseInt(task1.id) : task1.id;
        const id2 = typeof task2.id === 'string' ? parseInt(task2.id) : task2.id;
        return id2 - id1;
      }

      if (!task1.completed && task2.completed) {
        return -1;
      }

      if (task1.completed && !task2.completed) {
        return 1;
      }

      return 0;
    });
  };

  const sortedTasks = useMemo(() => {
    return orderTasks([...tasks]);
  }, [tasks]);

  return (
    <View style={styles.container}>
        <View style={{ paddingBottom: 10 }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={sortedTasks}
          renderItem={({item}) => {
            return (
              <TaskCard task={item}/>
            );
          }}
          ListEmptyComponent={() => (
            <View style={{ backgroundColor: theme.colorWhite, marginTop: 150 }}>
              <View style={{  opacity: 0.3, justifyContent: "center", alignItems: "center"}}>
                <AntDesign name="frowno" size={40} color="black" />
                <Text style={{ fontSize: 20, color: theme.colorBlack, marginTop: 10 }}>
                  No tasks available
                </Text>
              </View>
            </View>
          )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingHorizontal: 10,
  },
});

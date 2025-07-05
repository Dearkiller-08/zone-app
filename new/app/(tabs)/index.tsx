import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TaskCard from "../../component/TaskCard";
import { theme } from "../../theme";
import TaskOverviewCard from "../../component/TaskOverviewCard";
import AddTask from "../../component/AddTask";
import FilterTask from "../../component/FilterTask";
import { useTaskStore } from "../../store/taskStore";


export default function App() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        data={tasks}
        renderItem={({item}) => {
          return (
            <TaskCard task={item}/>
          );
        }}
        ListHeaderComponent={() =>(
          <View style={{ paddingBottom: 10 }}>
            <TaskOverviewCard />
            <FilterTask />
          </View>
          )
        }
        ListEmptyComponent={() => (
          <View style={{ justifyContent: 'center',alignItems: 'center'}}>
            <Text style={{ 
              color: theme.colorLightGrey, 
              fontWeight: 'bold', 
              textAlign: 'center'
            }}>No Tasks</Text>
          </View>
        )}
      />

      <AddTask />
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

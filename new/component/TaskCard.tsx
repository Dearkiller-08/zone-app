import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

import * as Haptics from 'expo-haptics'; 
import { Task, useTaskStore } from "../store/taskStore";

interface TaskCardProps {
    task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
    const toggleTaskCompleted = useTaskStore((state) => state.toggleTaskCompleted);
    
    const toggleCompleted = (task: Task) => {
        toggleTaskCompleted(task.id);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        console.log("Toogle Complted " + task.title );
    } 

    return (
        <View style={[styles.container, task.completed ? {backgroundColor: theme.colorLightGrey} : undefined]}>
            <TouchableOpacity 
                onPress={() => {}}
                activeOpacity={0.5}
                style={{ flex: 1  }}
            >
                <View style={styles.textDetailsContainer}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold'}}>{task.title}</Text>
                    <Text numberOfLines={2}>{task.description}</Text>
                </View>
            </TouchableOpacity>

            <Pressable 
            hitSlop={20}
            style={{ justifyContent: 'center'}} 
            onPress={() => toggleCompleted(task)}>
                <View >
                    {
                        task.completed
                        ? <Ionicons name="checkmark-done-sharp" size={24} color="black" />
                        : <Entypo name="circle" size={24} color="black" />
                    }
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 12,
        backgroundColor: theme.colorWhite,
        paddingHorizontal:8,
        borderBottomWidth: 1,
        borderBottomColor: theme.colorLightGrey,
    },
    textDetailsContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 4,
    }
});
import { Alert, Platform, Pressable, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native";
import { theme } from "../theme";

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import * as Haptics from 'expo-haptics'; 
import { Task, useTaskStore } from "../store/taskStore";

interface TaskCardProps {
    task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
    const toggleTaskCompleted = useTaskStore((state) => state.toggleTaskCompleted);
    const deleteTask = useTaskStore((state) => state.deleteTask);

    const toggleCompleted = (task: Task) => {
        toggleTaskCompleted(task.id);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    const handleDeleteTask = (task: Task) => {
        Alert.alert(
            "Delete Task",
            `Are you sure you want to delete the task "${task.title}"?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        deleteTask(task.id);
                    },
                },
            ],
            { cancelable: true }
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    
    return (
        <View style={[styles.container ]}>
            <Pressable 
            hitSlop={20}
            style={{ justifyContent: 'center'}} 
            onPress={() => toggleCompleted(task)}>
                <View >
                    {
                        task.completed
                        ? <Ionicons name="checkmark-done-circle" size={30} color={theme.colorSuccessGreen} />
                        : <Entypo name="circle" size={30} color="black" />
                    }
                </View>
            </Pressable>
            
            <TouchableOpacity 
                onPress={() => {}}
                activeOpacity={0.5}
                style={{ flex: 1  }}
            >
                <View style={styles.textDetailsContainer}>
                    <Text style={[{ 
                        fontSize: 18, 
                        fontWeight: 'bold'
                    }, task.completed ? { 
                        opacity: 0.5,
                        } : undefined]}>{task.title}</Text>
                    
                    {task.description ? (
                        <Text 
                        style={[{ 
                            fontSize: 14, 
                            color: theme.colorGrey 
                        }, task.completed ? { 
                            opacity: 0.5,
                        } : undefined]}
                        numberOfLines={2}>{task.description}</Text>
                    ) : undefined}
                </View>
            </TouchableOpacity>

            <Pressable 
                hitSlop={20}
                style={{ justifyContent: 'center'}} 
                onPress={() => handleDeleteTask(task)}
            >
                <View >
                    <MaterialIcons name="delete" size={24} color={theme.colorErrorRed} />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 12,
        backgroundColor: theme.colorWhite,
        paddingHorizontal:8,
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 2,
        borderColor: theme.colorLightGrey,
    },
    textDetailsContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 4,
    }
});
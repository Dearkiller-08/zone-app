import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { theme } from "../theme";
import { useTaskStore } from "../store/taskStore";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';

export default function AddTaskScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const  addTask  = useTaskStore((state) => state.addTask);
    const router = useRouter();

    const handleAddTask = () => {
        if (title.trim()) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            addTask(title.trim(), description.trim(), false);
            setTitle('');
            setDescription('');
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <TextInput 
                    placeholder="Task Title"
                    value={title}
                    onChangeText={setTitle}
                    style={{
                        width: '90%',
                        borderWidth: 1,
                        borderColor: theme.colorGrey,
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 10,
                    }}
                />
                <TextInput 
                    placeholder="Task Description"
                    value={description}
                    onChangeText={setDescription}
                    style={{
                        width: '90%',
                        borderWidth: 1,
                        borderColor: theme.colorGrey,
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 10,
                        minHeight: 100,
                        textAlignVertical: 'top', 
                    }}
                    multiline
                />

                <TouchableOpacity 
                    activeOpacity={0.7} 
                    onPress={handleAddTask}
                    style={{
                        backgroundColor: theme.colorBlack,
                        padding: 15,
                        borderRadius: 5,
                        width: '90%',
                    }}
                >
                    <Text style={{ color: theme.colorWhite, fontSize: 16, textAlign: 'center' }}>Add Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: theme.colorWhite,
    }
});
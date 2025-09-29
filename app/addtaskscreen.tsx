import { StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from "react-native";
import { useState } from "react";
import { theme } from "../theme";
import { useTaskStore } from "../store/taskStore";
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTaskScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [taskDate, setTaskDate] = useState(new Date());
    const  addTask  = useTaskStore((state) => state.addTask);
    const router = useRouter();

    const handleAddTask = () => {
        if (title.trim()) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            addTask(title.trim(), description.trim(), false, taskDate);
            setTitle('');
            setDescription('');
            setTaskDate(new Date());
            router.back();
        }
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || taskDate;
        setTaskDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <TextInput 
                    placeholder="Task Title"
                    placeholderTextColor={'grey'}
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

                <View
                    style={{
                        width: '90%',
                        borderWidth: 1,
                        borderColor: theme.colorGrey,
                        padding: 0,
                        borderRadius: 5,
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: theme.colorWhite,
                        overflow: 'hidden',
                        height: 48,
                    }}
                >
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={taskDate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onDateChange}
                        minimumDate={new Date()}
                        style={{
                            backgroundColor: 'black',
                            paddingRight: 8,
                            marginLeft: 8,
                            borderRadius: 10
                        }}
                    />
                </View>

                <TextInput 
                    placeholder="Task Description"
                    placeholderTextColor={'grey'}
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
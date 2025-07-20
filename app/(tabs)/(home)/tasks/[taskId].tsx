import { Text, View, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTaskStore } from "../../../../store/taskStore";
import { theme } from "../../../../theme";

export default function TaskDetail() {
    const { taskId } = useLocalSearchParams();
    const router = useRouter();
    const tasks = useTaskStore((state) => state.tasks);
    const startTask = useTaskStore((state) => state.startTask);
    
    const task = tasks.find(t => t.id === taskId);
    
    const handleStartTask = () => {
        if (taskId) {
            startTask(String(taskId));
            router.back();
            router.replace(`/(tabs)/counter`);
        }
    };
    
    if (!task) {
        return (
            <View style={styles.container}>
                <Text>Task not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            {task.description ? (
                <Text style={styles.description}>{task.description}</Text>
            ) : null}
            <Text style={styles.date}>
                Date: {new Date(task.date).toLocaleDateString()}
            </Text>
            <Text style={styles.status}>
                Status: {task.completed ? 'Completed' : 'Pending'}
            </Text>
            
            {!task.completed && (
                <Pressable style={styles.startButton} onPress={handleStartTask}>
                    <Text style={styles.buttonText}>Start Task</Text>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.colorWhite,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: theme.colorGrey,
        marginBottom: 20,
        lineHeight: 24,
    },
    date: {
        fontSize: 16,
        marginBottom: 10,
    },
    status: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 30,
    },
    startButton: {
        backgroundColor: theme.colorBlack,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: theme.colorWhite,
        fontSize: 16,
        fontWeight: '600',
    },
});
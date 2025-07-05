import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

export default function AddTask() {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.navigate('/addtaskscreen')} 
            style={{ marginRight: 10, marginBottom: 5,position: 'absolute', bottom: 0, right: 0 }}>
            <Ionicons name="add-circle" size={80} color="black" />
        </TouchableOpacity>
    );
}
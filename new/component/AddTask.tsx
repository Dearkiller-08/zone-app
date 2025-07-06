import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

export default function AddTask() {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.navigate('/addtaskscreen')}
            style={{
                position: 'absolute',
                bottom: 10,
                right: 30,
                backgroundColor: 'white',
                borderRadius: 50,
                padding: 4,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }} 
            >
            <Ionicons name="add-circle" size={50} color="black" />
        </TouchableOpacity>
    );
}
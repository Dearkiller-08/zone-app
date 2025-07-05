import { Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { theme } from "../theme";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TaskOverviewCard() {
    return (
        <Pressable style={styles.container}>
            <Text>2025-06-23</Text>
            <View style={{ flexDirection:'row', justifyContent:'space-between' ,alignItems: 'baseline'}}>
                <AntDesign name="calendar" size={24} color="black" />
                <Text>1/5 Tasks</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colorWhite,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 8,
        padding: 24,
        height: 150
    }
});
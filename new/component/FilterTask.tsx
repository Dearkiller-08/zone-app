import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { theme } from "../theme";

const fakeFilterLists = [
    "All",
    "School",
    "Work",
    "Training",
    "Others"
];

export default function FilterTask() {
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ paddingTop: 10}} 
                data={fakeFilterLists}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: theme.colorBlack, borderRadius: 50, marginHorizontal: 4 }}>
                            <Text
                                style={{ color: theme.colorWhite , paddingHorizontal: 14, paddingVertical: 8 }}
                            >{item}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:4,
        paddingTop: 8,
    }
});
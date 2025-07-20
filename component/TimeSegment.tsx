import { Text, View, StyleSheet, TextStyle } from "react-native";
import { theme } from "../theme";

type TimeSegmentProps = {
    unit: string;
    number: number;
    textStyle?: TextStyle;
};

export function TimeSegment({ unit, number, textStyle }: TimeSegmentProps) {
    return (
        <View style={styles.container}>
            <Text style={[styles.number, textStyle]}>
                {number.toString().padStart(2, '0')}
            </Text>
            <Text style={[styles.unit, textStyle]}>
                {unit}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    number: {
        fontSize: 48,
        fontWeight: 'bold',
        color: theme.colorBlack,
        lineHeight: 56,
    },
    unit: {
        fontSize: 14,
        color: theme.colorGrey,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 4,
    },
});

import { Link, Tabs } from "expo-router";
import { Pressable, Text, View, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { theme } from "../../theme";

function CustomTabBar({ state, navigation }: any) {
    const currentRoute = state.routes[state.index].name;
    
    return (
        <View style={styles.tabBar}>
            <Pressable
                style={styles.tabItem}
                onPress={() => navigation.navigate('(home)')}
            >
                <Entypo 
                    name="home" 
                    size={24} 
                    color={currentRoute === '(home)' ? theme.colorSuccessGreen : theme.colorGrey} 
                />
            </Pressable>

            <Link href="/addtaskscreen" asChild>
                <Pressable style={styles.fabButton}>
                    <View style={styles.fabContainer}>
                        <Ionicons name="add" size={28} color={theme.colorWhite} />
                    </View>
                </Pressable>
            </Link>

            <Pressable
                style={styles.tabItem}
                onPress={() => navigation.navigate('counter')}
            >
                <FontAwesome6 
                    name="clock-rotate-left" 
                    size={24} 
                    color={currentRoute === 'counter' ? theme.colorSuccessGreen : theme.colorGrey} 
                />
            </Pressable>
        </View>
    );
}

export default function Layout() {
    return(
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="(home)" options={{
                headerShadowVisible: false,
                headerTitle: '',
                headerLeft: () => {
                    return(
                        <Text
                        style={{
                            marginLeft: 18,
                            fontSize: 30,
                            fontWeight: 'bold',
                            textTransform: 'uppercase'
                        }}
                        >
                            Zone
                        </Text>
                    );
                },
                headerRight: () => {
                    return (
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <Link
                                style={{
                                    marginRight: 20
                                }}
                                href="/notificationlist" 
                                asChild
                            >
                                <Pressable hitSlop={20}>
                                    <Ionicons name="notifications" size={35} color="black" />
                                </Pressable>
                            </Link>
                        </View>
                    )
                }
            }}/>
            
            <Tabs.Screen name="counter" options={{}}/>
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        height: 90,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e1e1e1',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 20,
        paddingTop: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    fabButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    fabContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colorBlack,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
});
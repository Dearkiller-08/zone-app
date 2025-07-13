import { Link, Tabs } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Layout() {
    return(
        <Tabs>
            <Tabs.Screen name="index" options={{
                headerShadowVisible: false,
                headerTitle: '',
                tabBarShowLabel: false,
                tabBarIconStyle: {marginTop: 20},
                tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
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
                            <Link href={'/addtaskscreen'} asChild>
                                <Pressable hitSlop={20}>
                                    <Ionicons name="add-circle" size={37} color="black" />
                                </Pressable>
                            </Link>

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
            <Tabs.Screen name="counter" options={{
                tabBarShowLabel: false,
                tabBarIconStyle: {marginTop: 20},
                tabBarIcon: () => <FontAwesome6 name="clock-rotate-left" size={24} color="black" />,
            }}/>
        </Tabs>
    );
}
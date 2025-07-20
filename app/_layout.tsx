import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{
                title: '',
                headerShown: false,
            }}/>
            <Stack.Screen name="onboarding" options={{
                title: "Onboarding",
            }}/>
            <Stack.Screen name="addtaskscreen" options={{
                title: "Add Task",
                presentation: "modal"
            }}/>
            <Stack.Screen name="notificationlist" options={{
                title: "Notifications",
            }}/>
        </Stack>
    )
}

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import NotificationScreen from './screens/NotificationScreen';
import { TaskProvider } from './TaskContext';
import DetailsNotificationScreen from './screens/DetailsNotificationScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={({ headerShown: false, statusBarColor: 'white' })}>
          <Stack.Screen
          options={{
              headerStyle: {
                backgroundColor: 'white'
              }
          }}
          name="Home" component={HomeScreen} 
          />
          <Stack.Screen name="Add Task" component={AddTaskScreen} />
          <Stack.Screen name="Notifications" component={NotificationScreen} />
          <Stack.Screen name="Details" component={DetailsNotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}

export default AppNavigator;

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomScreen';
import AppNavigator from './AppNavigator';


function App() {
  return (
    <AppNavigator />
  );
}

export default App;

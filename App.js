import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa suas telas
import HomeScreen from './src/screens/HomeScreen';
import AddMedScreen from './src/screens/AddMedScreen'; // você vai criar essa tela depois

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Adicionar" component={AddMedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
<Stack.Screen name="Adicionar" component={AddMedScreen} />
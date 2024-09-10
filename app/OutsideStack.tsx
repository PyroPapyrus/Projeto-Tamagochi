import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OutsideScreen from './OutsideScreen';
import MinigameScreen from './MinigameScreen'; // Certifique-se de que este import está correto

type RootStackParamList = {
  OutsideMain: { tamagochiId: number };
  Minigame: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const OutsideStack: React.FC<{ tamagochiId: number }> = ({ tamagochiId }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="OutsideMain" 
        component={OutsideScreen} 
        initialParams={{ tamagochiId }} 
      />
      <Stack.Screen 
        name="Minigame" 
        component={MinigameScreen} 
      />
    </Stack.Navigator>
  );
};

export default OutsideStack;

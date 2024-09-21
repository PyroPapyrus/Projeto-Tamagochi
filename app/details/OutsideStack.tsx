import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OutsideScreen from '@/app/details/OutsideScreen';
import MinigameScreen from './MinigameScreen';
import SecondMinigameScreen from './SecondMinigameScreen';

// Define o tipo dos parâmetros para cada tela da stack
type RootStackParamList = {
  OutsideMain: { tamagochiId: number }; // Tela principal recebe o ID do tamagochi como parâmetro
  Minigame: undefined; // Tela do primeiro minigame não recebe parâmetros
  SecondMinigameScreen: undefined; // Tela do segundo minigame não recebe parâmetros
};

// Cria a stack de navegação com os tipos definidos acima
const Stack = createNativeStackNavigator<RootStackParamList>();

// Componente de navegação que envolve as telas
// Recebe a prop `tamagochiId` que será passada para a tela principal
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
      <Stack.Screen 
        name="SecondMinigameScreen" 
        component={SecondMinigameScreen} 
      />
    </Stack.Navigator>
  );
};

export default OutsideStack;

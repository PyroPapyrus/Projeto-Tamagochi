import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import KitchenScreen from './details/KitchenScreen';
import BedroomScreen from './details/BedroomScreen';
import OutsideStack from './details/OutsideStack';
import { Icon } from '@rneui/base';
import { FontAwesome6 } from '@expo/vector-icons';

// Criação do componente Tab Navigator, que gerencia a navegação entre abas
const Tab = createBottomTabNavigator();

const TamagochiDetails: React.FC = () => {
  const route = useRoute(); // Hook para acessar os parâmetros da rota
  const { tamagochiId } = route.params as { tamagochiId: number }; // Obtém o ID do Tamagochi passado na rota
  const [tamagochi, setTamagochi] = useState<Tamagochi | null>(null); // Estado para armazenar o Tamagochi atual
  const database = useTamagochiDatabase(); // Acesso ao banco de dados
 
  // useEffect para buscar os dados do Tamagochi no banco de dados quando o componente é montado
  useEffect(() => {
    const fetchTamagochi = async () => {
      const tamagochiData = await database.findTamagochiById(tamagochiId); // Busca o Tamagochi pelo ID
      setTamagochi(tamagochiData);  // Atualiza o estado com os dados do Tamagochi
    };

    fetchTamagochi();  // Chama a função assim que o componente é montado
  }, [tamagochiId]); // Executa o efeito sempre que o tamagochiId mudar

  // Enquanto o Tamagochi está carregando, exibe uma mensagem de carregamento
  if (!tamagochi) {
    return <Text>Carregando...</Text>;
  }

  const status = calculateTamagochiStatus(tamagochi.hunger, tamagochi.sleep, tamagochi.happy); // Calcula o estado atual do Tamagochi

  return (
    // Tab.Navigator cria a barra de navegação inferior com as diferentes telas
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Bedroom" 
        component={BedroomScreen} 
        initialParams={{ tamagochiId }} 
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#f1c40f' : 'gray', fontSize: 10 }}>Bedroom</Text>
          ), 
          tabBarIcon: ({ focused }) => (
            <Icon name="bedroom-parent" size={24} color={focused ? '#f1c40f' : 'gray'} />
          ), 
        }}
      />
      
      <Tab.Screen 
        name="Kitchen" 
        component={KitchenScreen} 
        initialParams={{ tamagochiId }} 
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#27ae60' : 'gray', fontSize: 10 }}>Kitchen</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Icon name="kitchen" size={24} color={focused ? '#27ae60' : 'gray'} />
          ),
        }}
      />

      <Tab.Screen 
        name="Outside" 
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#3498db' : 'gray', fontSize: 10 }}>Outside</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome6 name="house" size={20} color={focused ? '#3498db' : 'gray'} />
          ),
        }}
      >
        {() => <OutsideStack tamagochiId={tamagochiId} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  attributesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
});

export default TamagochiDetails;

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import KitchenScreen from './KitchenScreen';
import BedroomScreen from './BedroomScreen';
import OutsideStack from './OutsideStack'; // Importando o OutsideStack
import { Icon } from '@rneui/base';
import { FontAwesome6 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TamagochiDetails: React.FC = () => {
  const route = useRoute();
  const { tamagochiId } = route.params as { tamagochiId: number };
  const [tamagochi, setTamagochi] = useState<Tamagochi | null>(null);
  const database = useTamagochiDatabase();

  useEffect(() => {
    const fetchTamagochi = async () => {
      const tamagochiData = await database.findTamagochiById(tamagochiId);
      setTamagochi(tamagochiData);
    };

    fetchTamagochi();
  }, [tamagochiId]);

  if (!tamagochi) {
    return <Text>Carregando...</Text>;
  }

  const status = calculateTamagochiStatus(tamagochi.hunger, tamagochi.sleep, tamagochi.happy);

  return (
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

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import KitchenScreen from './KitchenScreen';
import BedroomScreen from './BedroomScreen';
import OutsideScreen from './OutsideScreen';

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
    <Tab.Navigator>
      <Tab.Screen name="Kitchen" component={KitchenScreen} initialParams={{ tamagochiId }} />
      <Tab.Screen name="Bedroom" component={BedroomScreen} initialParams={{ tamagochiId }} />
      <Tab.Screen name="Outside" component={OutsideScreen} initialParams={{ tamagochiId }} />
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

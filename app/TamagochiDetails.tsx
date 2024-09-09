import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { getTamagochiImage } from '@/utils/getTamagochiImage';
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import KitchenScreen from './KitchenScreen';
import BedroomScreen from './BedroomScreen';
import OutsideScreen from './OutsideScreen';
import { TamagochiType } from '@/assets/images/TamagochiImages';

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
    <View style={styles.container}>
      <Image source={getTamagochiImage(status, tamagochi.tamagochi_id as TamagochiType)} style={styles.image} />
      <View style={styles.attributesContainer}>
        <Text>Fome: {tamagochi.hunger}</Text>
        <Text>Sono: {tamagochi.sleep}</Text>
        <Text>Felicidade: {tamagochi.happy}</Text>
      </View>
      <Tab.Navigator >
        <Tab.Screen name="Cozinha" component={KitchenScreen} />
        <Tab.Screen name="Quarto" component={BedroomScreen} />
        <Tab.Screen name="Lado de Fora" component={OutsideScreen} />
      </Tab.Navigator>
    </View>
  );
};
{/* <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}

      />

        <Tabs.Screen
      
        name='teste'
        options={{
          title:'Teste',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'balloon' :
               'balloon-outline'}
                color={color} />
            ),
        }}
      
      />
      
    </Tabs> */}

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

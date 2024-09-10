import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { getTamagochiImage } from '@/utils/getTamagochiImage';
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import { TamagochiType } from '@/assets/images/TamagochiImages';

const KitchenScreen: React.FC = () => {
  const route = useRoute();
  const { tamagochiId } = route.params as { tamagochiId: number };
  const [tamagochi, setTamagochi] = useState<Tamagochi | null>(null);
  const database = useTamagochiDatabase();

  const fetchTamagochi = async () => {
    const tamagochiData = await database.findTamagochiById(tamagochiId);
    setTamagochi(tamagochiData);
    await AsyncStorage.setItem('tamagochi', JSON.stringify(tamagochiData));
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTamagochi();
    }, [tamagochiId])
  );

  const handleFeed = async () => {
    if (tamagochi) {
      const newHunger = Math.min(tamagochi.hunger + 10, 100); // Incrementa a fome em 10, mas não ultrapassa 100
      await database.updateHunger(tamagochi.id, newHunger);
      const updatedTamagochi = { ...tamagochi, hunger: newHunger };
      setTamagochi(updatedTamagochi);
      await AsyncStorage.setItem('tamagochi', JSON.stringify(updatedTamagochi));
    }
  };

  if (!tamagochi) {
    return <Text>Carregando...</Text>;
  }

  const status = calculateTamagochiStatus(tamagochi.hunger, tamagochi.sleep, tamagochi.happy);

  return (

    <ImageBackground
      source={require('@/assets/images/kitchen.gif')}
      style={styles.background}
    >
    <View style={styles.container}>
      <Image source={getTamagochiImage(status, tamagochi.tamagochi_id as TamagochiType)} style={styles.image} />
      <View style={styles.attributesContainer}>
        <Text>Fome: {tamagochi.hunger}</Text>
        <Text>Sono: {tamagochi.sleep}</Text>
        <Text>Felicidade: {tamagochi.happy}</Text>
      </View>

      <Pressable onPress={handleFeed}>
        <Image source={require('../assets/images/fruit.png')} style={styles.fruitImage}/>
      </Pressable>

    </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  background: {
    flex: 1
  },

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
  fruitImage: {
    width: 50,
    height: 50,
  },
  attributesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
});

export default KitchenScreen;

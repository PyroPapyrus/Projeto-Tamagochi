import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { getTamagochiImage } from '@/utils/getTamagochiImage';
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import { TamagochiType } from '@/assets/images/TamagochiImages';

const BedroomScreen: React.FC = () => {
  const route = useRoute();
  const { tamagochiId } = route.params as { tamagochiId: number };
  const [tamagochi, setTamagochi] = useState<Tamagochi | null>(null);
  const [isSleeping, setIsSleeping] = useState(false);
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

  const handleSleep = async () => {
    if (tamagochi) {
      setIsSleeping(true);
      const newSleep = Math.min(tamagochi.sleep + 10, 100); // Incrementa o sono em 10, mas não ultrapassa 100
      await database.updateSleep(tamagochi.id, newSleep);
      const updatedTamagochi = { ...tamagochi, sleep: newSleep };
      setTamagochi(updatedTamagochi);
      await AsyncStorage.setItem('tamagochi', JSON.stringify(updatedTamagochi));
      setTimeout(() => setIsSleeping(false), 10000); // Botão inativo por 10 segundos
    }
  };

  if (!tamagochi) {
    return <Text>Carregando...</Text>;
  }

  const status = calculateTamagochiStatus(tamagochi.hunger, tamagochi.sleep, tamagochi.happy);

  return (
    <ImageBackground
      source={isSleeping ? require('@/assets/images/night.jpeg') : require('@/assets/images/day.jpeg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={getTamagochiImage(status, tamagochi.tamagochi_id as TamagochiType)} style={styles.image} />
        <View style={styles.attributesContainer}>
          <Text>Fome: {tamagochi.hunger}</Text>
          <Text>Sono: {tamagochi.sleep}</Text>
          <Text>Felicidade: {tamagochi.happy}</Text>
        </View>
        <Pressable onPress={handleSleep} disabled={isSleeping} style={[styles.sleepButton, isSleeping && styles.sleepButtonInactive]}>
          <Text style={styles.buttonText}>Dormir</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
  attributesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  sleepButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  sleepButtonInactive: {
    backgroundColor: '#A5D6A7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BedroomScreen;

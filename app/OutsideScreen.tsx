import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { getTamagochiImage } from '@/utils/getTamagochiImage';
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import { TamagochiType } from '@/assets/images/TamagochiImages';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  OutsideMain: { tamagochiId: number };
  Minigame: undefined;
};

type OutsideScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OutsideMain'>;

const OutsideScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<OutsideScreenNavigationProp>();
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

  const handlePlay = async () => {
    if (tamagochi) {
      const newHappy = Math.min(tamagochi.happy + 10, 100); // Incrementa a felicidade em 10, mas não ultrapassa 100
      await database.updateHappy(tamagochi.id, newHappy);
      const updatedTamagochi = { ...tamagochi, happy: newHappy };
      setTamagochi(updatedTamagochi);
      await AsyncStorage.setItem('tamagochi', JSON.stringify(updatedTamagochi));
      navigation.navigate('Minigame'); // Navega para a tela do minigame
    }
  };

  const handleWalk = async () => {
    if (tamagochi) {
      const newHappy = Math.min(tamagochi.happy + 5, 100); // Incrementa a felicidade em 5, mas não ultrapassa 100
      await database.updateHappy(tamagochi.id, newHappy);
      const updatedTamagochi = { ...tamagochi, happy: newHappy };
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
      source={require('../assets/images/bakground.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={getTamagochiImage(status, tamagochi.tamagochi_id as TamagochiType)} style={styles.image} />
        <View style={styles.attributesContainer}>
          <Text>Fome: {tamagochi.hunger}</Text>
          <Text>Sono: {tamagochi.sleep}</Text>
          <Text>Felicidade: {tamagochi.happy}</Text>
        </View>
        <Pressable onPress={handlePlay} style={styles.playButton}>
          <Text style={styles.buttonText}>Brincar</Text>
        </Pressable>
        <Pressable onPress={handleWalk} style={styles.walkButton}>
          <Text style={styles.buttonText}>Passear</Text>
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
  playButton: {
    backgroundColor: '#FFEB3B',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  walkButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default OutsideScreen;

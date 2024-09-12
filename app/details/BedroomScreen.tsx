import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { getTamagochiImage } from '@/utils/getTamagochiImage';
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import { TamagochiType } from '@/assets/images/TamagochiImages';
import AtributtesContainer from '@/components/AtributtesContainer';
import HungerContainer from '@/components/HungerContainer';
import SleepContainer from '@/components/SleepContainer';
import HappyContainer from '@/components/HappyContainer';
import StatusContainer from '@/components/StatusContainer';
import { getSleepingImage } from '@/utils/getSleepImage';

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
      source={isSleeping ? require('@/assets/images/night.jpg') : require('@/assets/images/day.jpeg')}
      style={styles.background}
    >

      <SafeAreaView>
      <AtributtesContainer>
        <View> 
          <HungerContainer>
            <Text style={styles.text}>Fome{'\n'}{tamagochi.hunger}</Text>
          </HungerContainer>
        </View>  

        <View> 
          <SleepContainer>
            <Text style={styles.text}>Sono{'\n'}{tamagochi.sleep}</Text>
          </SleepContainer>
        </View> 

        <View> 
          <HappyContainer>
            <Text style={styles.text}>Humor{'\n'}{tamagochi.happy}</Text>
          </HappyContainer>
        </View> 
        </AtributtesContainer> 
      </SafeAreaView>

      <View>
        <StatusContainer>
          <Text style={styles.statusText}>STATUS</Text>
          <Text style={styles.statusNumberText}>{status}</Text>
        </StatusContainer>
      </View>

      <View style={styles.container}>

        <Image source={isSleeping ? getSleepingImage(tamagochi.tamagochi_id as TamagochiType) : getTamagochiImage(status, tamagochi.tamagochi_id as TamagochiType)} style={styles.image} />

        <TouchableOpacity onPress={handleSleep} disabled={isSleeping} style={[styles.sleepButton, isSleeping && styles.sleepButtonInactive]}>
          <Text style={styles.buttonText}>Dormir</Text>
        </TouchableOpacity>

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
  },

  image: {
    width: 200,
    height: 200,
    marginVertical: 200,
    marginBottom: 20,
  },

  text: {
    fontFamily: 'PixelifySansBold',
    textAlign: 'center',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    fontSize: 20
  },

  textAttributes: {
    color: 'white',
    fontWeight: 'bold',
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20,
    textShadowColor: 'cyan'
  },

  statusText: {
    fontFamily: 'PixelifySansBold',
    color: 'white',
  },

  statusNumberText: {
    fontFamily: 'PixelifySansBold',
    color: '#00a600',
  },

  sleepButton: {
    backgroundColor: '#00a600',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 15
  },

  sleepButtonInactive: {
    backgroundColor: '#A5D6A7',
    opacity: 0.5
  },

  buttonText: {
    fontFamily: 'PixelySansBold',
    color: '#fff',
    fontSize: 16,
  },
});

export default BedroomScreen;

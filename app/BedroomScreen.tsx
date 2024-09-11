import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground, SafeAreaView } from 'react-native';
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

      <SafeAreaView style={styles.attributesContainer}> 
        <View style={styles.hungerContainer}> 
        <Text style={styles.text}>Fome{'\n'}{tamagochi.hunger}</Text>
        </View>  

        <View style={styles.sleepContainer}> 
        <Text style={styles.text}>Sono{'\n'}{tamagochi.sleep}</Text>
        </View> 

        <View style={styles.happyContainer}> 
        <Text style={styles.text}>Humor{'\n'}{tamagochi.happy}</Text>
        </View> 
      </SafeAreaView>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>STATUS</Text>
        <Text style={styles.statusNumberText}>{tamagochi.status}</Text>
      </View>

      <View style={styles.container}>        
        <Image source={getTamagochiImage(status, tamagochi.tamagochi_id as TamagochiType)} style={styles.image} />

      <Text>
        <Pressable onPress={handleSleep} disabled={isSleeping} style={[styles.sleepButton, isSleeping && styles.sleepButtonInactive]}>
          <Text style={styles.buttonText}>Dormir</Text>
        </Pressable>
      </Text>

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
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
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

  attributesContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginTop: 30,
    padding: 5,
    shadowColor: 'white',
    elevation: 7,
  },

  statusContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    shadowColor: 'white',
    elevation: 7,
  },

  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },

  statusNumberText: {
    color: '#00a600',
    fontWeight: 'bold'
  },

  hungerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignSelf: 'flex-start', 
      backgroundColor: 'rgba(229, 43, 20, 0.4)',
      padding: 5,
      borderRadius: 5
  },

  sleepContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start', 
    backgroundColor: 'rgba(152, 8, 229, 0.4)',
    padding: 5,
    borderRadius: 5
  },

  happyContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start', 
    backgroundColor: 'rgba(8, 132, 229, 0.4)',
    padding: 5,
    borderRadius: 5,
  },

  sleepButton: {
    backgroundColor: '#00a600',
    borderRadius: 5,
  },

  sleepButtonInactive: {
    backgroundColor: '#A5D6A7',
    opacity: 0.5
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BedroomScreen;

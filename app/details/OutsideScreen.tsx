import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground, SafeAreaView } from 'react-native';
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
  SecondMinigameScreen: undefined;
};

type OutsideScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OutsideMain'>;

const OutsideScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<OutsideScreenNavigationProp>();
  const { tamagochiId } = route.params as { tamagochiId: number };
  const [tamagochi, setTamagochi] = useState<Tamagochi | null>(null);
  const database = useTamagochiDatabase();
  const [isPlayButtonDisabled, setIsPlayButtonDisabled] = useState(false);
  const [isWalkButtonDisabled, setIsWalkButtonDisabled] = useState(false);


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
      setIsPlayButtonDisabled(true);
      const newHappy = Math.min(tamagochi.happy + 10, 100); // Incrementa a felicidade em 10, mas não ultrapassa 100
      await database.updateHappy(tamagochi.id, newHappy);
      const updatedTamagochi = { ...tamagochi, happy: newHappy };
      setTamagochi(updatedTamagochi);
      await AsyncStorage.setItem('tamagochi', JSON.stringify(updatedTamagochi));
      navigation.navigate('Minigame'); // Navega para a tela do minigame
      setTimeout(() => setIsPlayButtonDisabled(false), 10000) // Desabilita o botão por 10 segundos
    }

  };

  const handleWalk = async () => {

    if (tamagochi) {
      setIsWalkButtonDisabled(true);
      const newHappy = Math.min(tamagochi.happy + 5, 100); // Incrementa a felicidade em 5, mas não ultrapassa 100
      await database.updateHappy(tamagochi.id, newHappy);
      const updatedTamagochi = { ...tamagochi, happy: newHappy };
      setTamagochi(updatedTamagochi);
      await AsyncStorage.setItem('tamagochi', JSON.stringify(updatedTamagochi));
      navigation.navigate('SecondMinigameScreen');
      setTimeout(() => setIsWalkButtonDisabled(false), 10000); // Desabilita o botão por 10 segundos
    }
  };

  if (!tamagochi) {
    return <Text>Carregando...</Text>;
  }

  const status = calculateTamagochiStatus(tamagochi.hunger, tamagochi.sleep, tamagochi.happy);

  return (
    <ImageBackground
      source={require('@/assets/images/bakground.png')}
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
          <Text style={styles.statusNumberText}>{status}</Text>

      </View>

      <View style={styles.container}>
        <Image source={getTamagochiImage(status, tamagochi.tamagochi_id as TamagochiType)} style={styles.image} />

        <Pressable
          onPress={handlePlay} disabled={isPlayButtonDisabled} style={({ pressed }) => [
            styles.playButton,
            isPlayButtonDisabled && styles.disabledButton,
            pressed && styles.pressedButton, ]}>
          
          <Text style={styles.buttonText}>Brincar</Text>

        </Pressable>
        <Pressable onPress={handleWalk} disabled={isWalkButtonDisabled} style={({ pressed }) => [
            styles.walkButton,
            isWalkButtonDisabled && styles.disabledButton,
            pressed && styles.pressedButton, ]}>

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

  box: {
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
    color: '#00d100',
    fontWeight: 'bold',
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

  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginBottom: 10,
  },

  walkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  disabledButton: {
    opacity: 0.5,
    transform: [{ scale: 0.8 }],
  },
  pressedButton: {
    transform: [{ scale: 0.9 }],
  },
});

export default OutsideScreen;

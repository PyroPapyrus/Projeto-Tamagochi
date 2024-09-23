import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground, SafeAreaView } from 'react-native';
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { getTamagochiImage } from '@/utils/getTamagochiImage';
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import { TamagochiType } from '@/assets/images/TamagochiImages';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AtributtesContainer from '@/components/AtributtesContainer';
import SleepContainer from '@/components/SleepContainer';
import HappyContainer from '@/components/HappyContainer';
import HungerContainer from '@/components/HungerContainer';
import StatusContainer from '@/components/StatusContainer';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type RootStackParamList = {
  OutsideMain: { tamagochiId: number };
  Minigame: undefined;
  SecondMinigameScreen: undefined;
};

type OutsideScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OutsideMain'>;

const OutsideScreen: React.FC = () => {
  const route = useRoute(); // Acessa os parâmetros da rota
  const navigation = useNavigation<OutsideScreenNavigationProp>(); // Permite navegar para outras telas
  const { tamagochiId } = route.params as { tamagochiId: number }; // Recebe o ID do tamagochi
  const [tamagochi, setTamagochi] = useState<Tamagochi | null>(null); // Armazena os dados do tamagochi
  const database = useTamagochiDatabase(); // Acessa o banco de dados do tamagochi
  const [isPlayButtonDisabled, setIsPlayButtonDisabled] = useState(false); // Controla o estado do botão de "Brincar"
  const [isWalkButtonDisabled, setIsWalkButtonDisabled] = useState(false); // Controla o estado do botão de "Passear"


  // Função que busca os dados do tamagochi no banco de dados
  const fetchTamagochi = async () => {
    const tamagochiData = await database.findTamagochiById(tamagochiId);
    setTamagochi(tamagochiData);
    await AsyncStorage.setItem('tamagochi', JSON.stringify(tamagochiData)); // Armazena no AsyncStorage
  };

  // Efeito que busca os dados toda vez que a tela é focada
  useFocusEffect(
    React.useCallback(() => {
      fetchTamagochi();
    }, [tamagochiId])
  );

  // Função para o botão de "Brincar"
  const handlePlay = async () => {

    if (tamagochi) {
      setIsPlayButtonDisabled(true);
      navigation.navigate('Minigame'); // Navega para a tela do minigame
      setTimeout(() => setIsPlayButtonDisabled(false), 10000) // Desabilita o botão por 10 segundos
    }

  };

  // Função para o botão de "Passear"
  const handleWalk = async () => {

    if (tamagochi) {
      setIsWalkButtonDisabled(true);
      
      navigation.navigate('SecondMinigameScreen'); // Navega para o segundo minigame
      setTimeout(() => setIsWalkButtonDisabled(false), 10000); // Desabilita o botão por 10 segundos
    }
  };

  // Exibe um texto de carregamento enquanto os dados não foram carregados
  if (!tamagochi) {
    return <Text>Carregando...</Text>;
  }

  // Calcula o status geral do tamagochi com base nos atributos
  const status = calculateTamagochiStatus(tamagochi.hunger, tamagochi.sleep, tamagochi.happy);

  return (
    <ImageBackground
      source={require('@/assets/images/background-outside.webp')}
      style={styles.background}
    >

    <SafeAreaView>
      <AtributtesContainer>
        <View> 
          <HungerContainer>
            <Text style={styles.text}>Fome{'\n'}
              <Text style={styles.statusNumber}>{tamagochi.hunger}</Text>
            </Text>
          </HungerContainer>
        </View>  

        <View> 
          <SleepContainer>
            <Text style={styles.text}>Sono{'\n'}
              <Text style={styles.statusNumber}>{tamagochi.sleep}</Text>
            </Text>
          </SleepContainer>
        </View> 

        <View> 
          <HappyContainer>
            <Text style={styles.text}>Humor{'\n'}
              <Text style={styles.statusNumber}>{tamagochi.happy}</Text>
            </Text>
          </HappyContainer>
        </View> 
        </AtributtesContainer> 
      </SafeAreaView>

      <View>
        <StatusContainer>
          <Ionicons name="arrow-back" style={styles.arrowBack}
            onPress={() => {
            router.navigate('./ListTamagochi');
          }}/> 
          <Text style={styles.statusText}>STATUS</Text>
          <Text style={styles.statusNumberText}>{status}</Text>
        </StatusContainer>
      </View>

      <View style={styles.container}>
        <Image source={getTamagochiImage(status, tamagochi.tamagochi_id as TamagochiType)} style={styles.image} />

        <View style={styles.buttonContainer}> 
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
    marginVertical: 200,
    marginBottom: 20,
  },

  text: {
    fontFamily: 'PixelifySansBold',
    textAlign: 'center',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 1,
  },

  statusNumber: {
    fontFamily: 'Micro5',
    textAlign: 'center',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    fontSize: 27,
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 1,
  },

  textAttributes: {
    color: 'white',
    fontWeight: 'bold',
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20,
    textShadowColor: 'cyan'
  },

  box: {
    shadowColor: 'white',
    elevation: 7,
  },

  statusText: {
    fontFamily: 'PixelifySansBold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  statusNumberText: {
    fontFamily: 'PixelifySansBold',
    color: '#00d100',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 10
  },

  playButton: {
    padding: 12,
    backgroundColor: 'darkorange',
    paddingHorizontal: 14,
    borderRadius: 5,
    elevation: 10
  },

  walkButton: {
    padding: 12,
    backgroundColor: 'green',
    borderRadius: 5,
    elevation: 10
  },
  
  buttonText: {
    fontFamily: 'PixelifySansBold',
    color: 'white',
    fontSize: 16,
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  disabledButton: {
    opacity: 0.5,
    transform: [{ scale: 0.8 }],
  },

  pressedButton: {
    transform: [{ scale: 0.8 }],
  },

  arrowBack: {
    fontSize: 32,
    color: "white",
    position: 'absolute',
    left: 15,
    top: 12
  },
});

export default OutsideScreen;

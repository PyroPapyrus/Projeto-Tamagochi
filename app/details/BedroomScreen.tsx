import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
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
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const BedroomScreen: React.FC = () => {
  // Obtém o ID do Tamagochi da rota de navegação
  const route = useRoute();
  const { tamagochiId } = route.params as { tamagochiId: number };
  // Estados para armazenar o Tamagochi e o status de sono
  const [tamagochi, setTamagochi] = useState<Tamagochi | null>(null);
  const [isSleeping, setIsSleeping] = useState(false);
  // Acessa o banco de dados do Tamagochi
  const database = useTamagochiDatabase();

  // Função para buscar o Tamagochi no banco de dados e salvar no estado e AsyncStorage
  const fetchTamagochi = async () => {
    const tamagochiData = await database.findTamagochiById(tamagochiId);
    setTamagochi(tamagochiData);
    await AsyncStorage.setItem('tamagochi', JSON.stringify(tamagochiData));
  };

  // useFocusEffect garante que os dados do Tamagochi sejam carregados sempre que a tela for exibida
  useFocusEffect(
    React.useCallback(() => {
      fetchTamagochi();
    }, [tamagochiId])
  );

  // Função para colocar o Tamagochi para dormir e aumentar seu nível de sono
  const handleSleep = async () => {
    if (tamagochi) {
      setIsSleeping(true); // Define que o Tamagochi está dormindo
      const newSleep = Math.min(tamagochi.sleep + 10, 100); // Incrementa o sono em 10, mas não ultrapassa 100
      await database.updateSleep(tamagochi.id, newSleep); // Atualiza o nível de sono no banco de dados
      const updatedTamagochi = { ...tamagochi, sleep: newSleep }; // Atualiza o estado com o novo nível de sono
      setTamagochi(updatedTamagochi);
      await AsyncStorage.setItem('tamagochi', JSON.stringify(updatedTamagochi)); // Salva o Tamagochi atualizado no AsyncStorage
      setTimeout(() => setIsSleeping(false), 5000); // Tamagochi "dorme" por 5 segundos
    }
  };

  // Exibe "Carregando..." enquanto o Tamagochi não foi carregado
  if (!tamagochi) {
    return <Text>Carregando...</Text>;
  }

  // Calcula o status geral do Tamagochi com base na fome, sono e humor
  const status = calculateTamagochiStatus(tamagochi.hunger, tamagochi.sleep, tamagochi.happy);

  return (
    <ImageBackground
      source={isSleeping ? require('@/assets/images/night.jpg') : require('@/assets/images/day.jpeg')} style={[styles.backgroundDay, isSleeping && styles.backgroundNight]} >

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
          <Ionicons name="arrow-back" style={styles.arrowBack}
            onPress={() => {
            router.navigate('./ListTamagochi');
          }}/>
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

  backgroundDay: {
    flex: 1
  },

  backgroundNight: {

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
    fontSize: 20,
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

  sleepButton: {
    backgroundColor: '#00a600',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 15,
    elevation: 5
  },

  sleepButtonInactive: {
    backgroundColor: '#A5D6A7',
    opacity: 0.5
  },

  buttonText: {
    fontFamily: 'PixelifySansBold',
    color: '#fff',
    fontSize: 18,
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 1,
  },

  arrowBack: {
    fontSize: 32,
    color: "white",
    position: 'absolute',
    left: 15,
    top: 12
  },
});

export default BedroomScreen;

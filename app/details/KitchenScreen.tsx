import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground, SafeAreaView } from 'react-native';
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
import getFoodImage from '@/utils/getFoodImage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


const KitchenScreen: React.FC = () => {
  // Obtém o ID do Tamagochi da rota de navegação
  const route = useRoute();
  const { tamagochiId } = route.params as { tamagochiId: number };
  // Estados para armazenar o Tamagochi, controlar o botão de alimentação e o índice da comida atual
  const [tamagochi, setTamagochi] = useState<Tamagochi | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [currentFood, setCurrentFood] = useState('hamburguer'); // Comida inicial é 'hamburguer'
  // Hook personalizado para interagir com o banco de dados do Tamagochi
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

  // Função para alimentar o Tamagochi, atualizando seu nível de fome e salvando no banco de dados
  const handleFeed = async () => {
    if (tamagochi) {
      setIsButtonDisabled(true); // Desabilita o botão de alimentação enquanto o Tamagochi está sendo alimentado
      const newHunger = Math.min(tamagochi.hunger + 10, 100); // Aumenta a fome sem ultrapassar 100
      await database.updateHunger(tamagochi.id, newHunger); // Atualiza a fome no banco de dados
      const updatedTamagochi = { ...tamagochi, hunger: newHunger };
      setTamagochi(updatedTamagochi); // Atualiza o estado com os novos dados
      await AsyncStorage.setItem('tamagochi', JSON.stringify(updatedTamagochi)); // Salva no AsyncStorage
      setTimeout(() => setIsButtonDisabled(false), 2000); // Reabilita o botão após 2 segundos
    }
  };

  // Função para alternar a comida anterior na lista (hamburguer, pizza, sushi)
  const handlePreviousFood = () => {
    setCurrentFood((prevFood) => {
      switch (prevFood) {
        case 'hamburguer':
          return 'sushi';
        case 'pizza':
          return 'hamburguer';
        case 'sushi':
          return 'pizza';
        default:
          return 'hamburguer';
      }
    });
  };

  // Função para alternar para a próxima comida na lista
 const handleNextFood = () => {
    setCurrentFood((prevFood) => {
      switch (prevFood) {
        case 'hamburguer':
          return 'pizza';
        case 'pizza':
          return 'sushi';
        case 'sushi':
          return 'hamburguer';
        default:
          return 'hamburguer';
      }
    });
  };

  // Exibe "Carregando..." enquanto o Tamagochi não foi carregado
  if (!tamagochi) {
    return <Text>Carregando...</Text>;
  }

  // Calcula o status geral do Tamagochi com base na fome, sono e humor
  const status = calculateTamagochiStatus(tamagochi.hunger, tamagochi.sleep, tamagochi.happy);

  return (
    <ImageBackground
      source={require('@/assets/images/kitchen.jpg')}
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
          <Ionicons name="arrow-back" style={styles.arrowBack}
            onPress={() => {
            router.navigate('./ListTamagochi');
          }}/>
          <Text style={styles.statusText}>STATUS</Text>
          <Text style={styles.statusNumberText}>{status}</Text>
        </StatusContainer>
      </View>

      <View style={styles.tamagochiContainer}> 
        <Image source={getTamagochiImage(status, tamagochi.tamagochi_id as TamagochiType)} style={styles.image} />
      </View>

      <View style={styles.container}>
        <View style={styles.arrowContainer}>
          <Pressable onPress={handlePreviousFood} style={styles.arrowButton}>
            <Ionicons name={'chevron-back-circle-outline'} style={styles.arrowText}/>
          </Pressable>
        </View>

        <Pressable onPress={handleFeed} disabled={isButtonDisabled} style={({ pressed }) => [
          isButtonDisabled && styles.disabledPressable, // Desabilita o botão se o Tamagochi estiver sendo alimentado
          pressed && styles.pressedPressable, // Muda o estilo ao pressionar
        ]}>
           <Image source={getFoodImage(currentFood)} style={styles.foodImage} />
        </Pressable>
        
        <View style={styles.arrowContainer}>
          <Pressable onPress={handleNextFood} style={styles.arrowButton}>
            <Ionicons name={'chevron-forward-circle-outline'} style={styles.arrowText}/>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 200,
    height: 200,
    marginVertical: 200,
    marginBottom: 20,
  },

  foodImage: {
    width: 90,
    height: 90,
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

  disabledPressable: {
    opacity: 0.5,
    transform: [{ scale: 0.8 }],
  },
  
  pressedPressable: {
    transform: [{ scale: 0.9 }],
  },

  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  arrowButton: {
    padding: 10,
  },

  arrowText: {
    fontSize: 30,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 1,
  },

  tamagochiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrowBack: {
    fontSize: 32,
    color: "white",
    position: 'absolute',
    left: 15,
    top: 12
  },
  
});

export default KitchenScreen;

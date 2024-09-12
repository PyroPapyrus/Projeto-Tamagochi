import React, { useEffect, useState } from 'react';
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


const KitchenScreen: React.FC = () => {
  const route = useRoute();
  const { tamagochiId } = route.params as { tamagochiId: number };
  const [tamagochi, setTamagochi] = useState<Tamagochi | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [currentFood, setCurrentFood] = useState('hamburguer');
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
      setIsButtonDisabled(true);
      const newHunger = Math.min(tamagochi.hunger + 10, 100);
      await database.updateHunger(tamagochi.id, newHunger);
      const updatedTamagochi = { ...tamagochi, hunger: newHunger };
      setTamagochi(updatedTamagochi);
      await AsyncStorage.setItem('tamagochi', JSON.stringify(updatedTamagochi));
      setTimeout(() => setIsButtonDisabled(false), 2000);
    }
  };

  const handlePreviousFood = () => {
    // Lógica para alterar a comida para a anterior
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

 const handleNextFood = () => {
    // Lógica para alterar a comida para a próxima
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

  if (!tamagochi) {
    return <Text>Carregando...</Text>;
  }

  const status = calculateTamagochiStatus(tamagochi.hunger, tamagochi.sleep, tamagochi.happy);

  return (
    <ImageBackground
      source={require('@/assets/images/kitchen.gif')}
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

      <View style={styles.tamagochiContainer}>
        <Image source={getTamagochiImage(status, tamagochi.tamagochi_id as TamagochiType)} style={styles.image} />
      </View>

      <View style={styles.container}>
        <View style={styles.arrowContainer}>
          <Pressable onPress={handlePreviousFood} style={styles.arrowButton}>
            <Text style={styles.arrowText}>{"<"}</Text>
          </Pressable>
        </View>

        <Pressable onPress={handleFeed} disabled={isButtonDisabled} style={({ pressed }) => [
          isButtonDisabled && styles.disabledPressable,
          pressed && styles.pressedPressable,
        ]}>
           <Image source={getFoodImage(currentFood)} style={styles.foodImage} />
        </Pressable>

        <View style={styles.arrowContainer}>
          <Pressable onPress={handleNextFood} style={styles.arrowButton}>
            <Text style={styles.arrowText}>{">"}</Text>
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
    marginVertical: 20,
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
  },
  statusText: {
    fontFamily: 'PixelifySansBold',
    color: 'white',
  },
  statusNumberText: {
    fontFamily: 'PixelifySansBold',
    color: '#00d100',
    fontWeight: 'bold'
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
  },
  tamagochiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KitchenScreen;

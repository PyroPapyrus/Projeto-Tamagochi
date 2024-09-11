import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground, SafeAreaView } from 'react-native';
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
  const [isButtonDisabled,setIsButtonDisabled] = useState(false);
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
      const newHunger = Math.min(tamagochi.hunger + 10, 100); // Incrementa a fome em 10, mas não ultrapassa 100
      await database.updateHunger(tamagochi.id, newHunger);
      const updatedTamagochi = { ...tamagochi, hunger: newHunger };
      setTamagochi(updatedTamagochi);
      await AsyncStorage.setItem('tamagochi', JSON.stringify(updatedTamagochi));
      setTimeout(() => setIsButtonDisabled(false), 2000); // Desabilita o botão por 2 segundos
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

      <Pressable onPress={handleFeed} disabled={isButtonDisabled} style={({ pressed }) => [
            styles.pressable,
            isButtonDisabled && styles.disabledPressable,
            pressed && styles.pressedPressable,
          ]}>
        <Image source={require('@/assets/images/fruit.png')} style={styles.fruitImage}/>
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

  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 10,
    fontSize: 20
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
    color: '#00d100',
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

  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledPressable: {
    opacity: 0.5,
    transform: [{ scale: 0.8 }],
  },
  pressedPressable: {
    transform: [{ scale: 0.9 }],
  },

});

export default KitchenScreen;

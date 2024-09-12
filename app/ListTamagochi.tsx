import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { updateAttributesBasedOnTime } from "@/utils/updateAttributesBasedOnTime";
import { getTamagochiImage } from '@/utils/getTamagochiImage';
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { TamagochiType } from '@/assets/images/TamagochiImages';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import { VirtualizedList } from 'react-native';

type ListTamagochiNavigationProp = StackNavigationProp<RootStackParamList, 'ListTamagochi'>;

const ListTamagochi: React.FC = () => {
  const [tamagochis, setTamagochis] = useState<Tamagochi[]>([]);
  const navigation = useNavigation<ListTamagochiNavigationProp>();
  const database = useTamagochiDatabase();

  const ChargeTamagochi = async () => {
    try {
      const allTamagochis = await database.findAllTamagochi();

      const updatedTamagochis = allTamagochis.map(async (tamagochi) => {
        const { hunger, sleep, happy } = updateAttributesBasedOnTime(
          tamagochi.lastUpdated,
          tamagochi.hunger,
          tamagochi.sleep,
          tamagochi.happy
        );

        const updatedTamagochi = {
          ...tamagochi,
          hunger,
          sleep,
          happy,
        };

        if (sleep !== tamagochi.sleep || hunger !== tamagochi.hunger || happy !== tamagochi.happy) {
          await database.updateAllTamagochiAttribute(tamagochi.id, hunger, sleep, happy);
        }

        return updatedTamagochi;
      });

      setTamagochis(await Promise.all(updatedTamagochis));
    } catch (error) {
      console.log('Erro ao carregar Tamagochis:', error);
    }
  };

  useEffect(() => {
    ChargeTamagochi();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      ChargeTamagochi();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  
  const deleteTamagochi = async (id: number) => {
    try {
      await database.deleteTamagochiById(id);
      setTamagochis(tamagochis.filter(tamagochi => tamagochi.id !== id));
    } catch (error) {
      console.log('Erro ao deletar Tamagochi:', error);
    }
  };

  const confirmDelete = (id: number) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você realmente deseja excluir este Tamagochi?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => deleteTamagochi(id),
          style: "destructive"
        }
      ]
    );
  };


  const renderItem = ({ item }: { item: Tamagochi }) => {

    const status = calculateTamagochiStatus(item.hunger, item.sleep, item.happy);
    const isDead = status === "morto";
    
    return (
      <View style={[styles.itemContainer, isDead && styles.deadItem]}>
        <Pressable onPress={() => !isDead && navigation.navigate('TamagochiDetails', { tamagochiId: item.id })}
        disabled={isDead} style={styles.pressable}>
          <Image source={getTamagochiImage(status, item.tamagochi_id as TamagochiType)} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </Pressable>
        <Ionicons
          name="trash-bin"
          size={26}
          color="red"
          onPress={() => confirmDelete(item.id)}
          style={styles.deleteButton}
        />
      </View>
    );
  };

  return (

  <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/c9/8b/a0/c98ba0403bb66007b04c6c396267d30d.jpg' }} style={styles.background}>
    
      <SafeAreaView>
          <Ionicons name="arrow-back" style={styles.arrowBack}
            onPress={() => {
            router.back();
          }}/>
      </SafeAreaView>
   
        <FlatList style={styles.list}
          data={tamagochis}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()} 

          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />    
        
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  
  arrowBack: {
    fontSize: 32,
    color: "black",     
    marginTop: 25,
    paddingHorizontal: 10, 
    paddingVertical: 5,    
    alignSelf: 'flex-start', 
  },

  separator: {
    height: 5,
  },

  background: {
    flex: 1,
  },

  list: {
    flexDirection: 'column',
    padding: 10,
    margin: 10,
    shadowColor: 'black',
  },

  buttonGoBack: {
    backgroundColor: 'white',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left', 
    padding: 20,
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },

  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 2,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 5
    
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  
  deadItem: {
    backgroundColor: 'gray', // Cor para itens "mortos"
  },

  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  deleteButton: {
    marginTop: 10,
    marginLeft: 'auto',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default ListTamagochi;

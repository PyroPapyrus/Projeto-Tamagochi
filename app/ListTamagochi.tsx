import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable, SafeAreaView, Alert } from 'react-native';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { updateAttributesBasedOnTime } from "@/utils/updateAttributesBasedOnTime";
import { getTamagochiImage } from '@/utils/getTamagochiImage';
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { TamagochiType } from '@/assets/images/TamagochiImages';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';

// Definição da tipagem para a navegação na lista de Tamagochis
type ListTamagochiNavigationProp = StackNavigationProp<RootStackParamList, 'ListTamagochi'>;

const ListTamagochi: React.FC = () => {
  const [tamagochis, setTamagochis] = useState<Tamagochi[]>([]); // Estado para armazenar a lista de Tamagochis
  const navigation = useNavigation<ListTamagochiNavigationProp>(); // Hook de navegação
  const database = useTamagochiDatabase(); // Acesso ao banco de dados

  // Função para carregar todos os Tamagochis e atualizar seus atributos baseados no tempo
  const ChargeTamagochi = async () => {
    try {
      const allTamagochis = await database.findAllTamagochi();

      // Atualiza os atributos de cada Tamagochi baseados no tempo
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

        // Atualiza no banco de dados se houver alguma mudança nos atributos
        if (sleep !== tamagochi.sleep || hunger !== tamagochi.hunger || happy !== tamagochi.happy) {
          await database.updateAllTamagochiAttribute(tamagochi.id, hunger, sleep, happy);
        }

        return updatedTamagochi;
      });

      setTamagochis(await Promise.all(updatedTamagochis)); // Atualiza o estado com a lista de Tamagochis
    } catch (error) {
      console.log('Erro ao carregar Tamagochis:', error);
    }
  };

  // useEffect para carregar os Tamagochis ao montar o componente
  useEffect(() => {
    ChargeTamagochi();
  }, []);

  // Atualiza a lista de Tamagochis a cada 3 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      ChargeTamagochi();
    }, 3000);

    return () => clearInterval(intervalId);  // Limpa o intervalo quando o componente é desmontado
  }, []);

  
  // Função para deletar um Tamagochi do banco de dados
  const deleteTamagochi = async (id: number) => {
    try {
      await database.deleteTamagochiById(id);
      setTamagochis(tamagochis.filter(tamagochi => tamagochi.id !== id));  // Remove o Tamagochi da lista
    } catch (error) {
      console.log('Erro ao deletar Tamagochi:', error);
    }
  };

  // Alerta de confirmação antes de deletar um Tamagochi
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


  // Função para renderizar cada item da lista de Tamagochis
  const renderItem = ({ item }: { item: Tamagochi }) => {

    const status = calculateTamagochiStatus(item.hunger, item.sleep, item.happy);  // Calcula o status do Tamagochi
    const isDead = status === "morto"; // Verifica se o Tamagochi está morto
    const TamagochiStatus = calculateTamagochiStatus(item.hunger, item.sleep, item.happy);
    
    return (
      <View style={[styles.itemContainer, isDead && styles.deadItem]}>
        <Pressable onPress={() => !isDead && navigation.navigate('TamagochiDetails', { tamagochiId: item.id })}
        disabled={isDead} style={styles.pressable}>
          <Image source={getTamagochiImage(status, item.tamagochi_id as TamagochiType)} style={styles.image} />
          
          <View style={styles.column}> 
            <Text style={[styles.name, isDead && styles.deadName]}>{item.name}</Text>
            <Text style={[styles.statusName, isDead && styles.deadName]}>{TamagochiStatus}</Text>
          </View>
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
              navigation.navigate('index');
          }}/>
      </SafeAreaView>
   
        <FlatList style={styles.list}
          data={tamagochis}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()} 

          ItemSeparatorComponent={() => <View style={styles.separator} />} // Separador entre itens
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
    elevation: 5,  
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  
  deadItem: {
    backgroundColor: '#686868a0',
  },
  
  deadName: { 
    color: 'red',
    borderColor: 'black',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 10
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
    fontFamily: 'PixelifySansBold',
    textShadowColor: '#5559',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5
  },

  statusName: {
    color: '#35c008',
    fontSize: 13,
    fontFamily:'PixelifySansMedium',
    textShadowColor: '#5555',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
  },
  column: {
    flexDirection: "column",
    gap: 5,
    marginLeft: 10
  }

});

export default ListTamagochi;

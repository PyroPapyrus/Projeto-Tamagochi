import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
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

  useEffect(() => {
    const fetchTamagochi = async () => {
      const tamagochiData = await database.findTamagochiById(tamagochiId);
      setTamagochi(tamagochiData);
    };

    fetchTamagochi();
  }, [tamagochiId]);

  
  const handleSleep = async () => {
    if (tamagochi) {
      setIsSleeping(true);
      const newSleep = Math.min(tamagochi.sleep + 10, 100); // Incrementa a fome em 10, mas não ultrapassa 100
      await database.updateSleep(tamagochi.id, newSleep);
      setTamagochi({ ...tamagochi, sleep: newSleep });
      setTimeout(() => setIsSleeping(false), 10000); // Botão inativo por 5 segundos
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
      <View style={styles.container}>
        <Image source={getTamagochiImage(status, tamagochi.tamagochi_id as TamagochiType)} style={styles.image} />
        <View style={styles.attributesContainer}>
          <Text>Fome: {tamagochi.hunger}</Text>
          <Text>Sono: {tamagochi.sleep}</Text>
          <Text>Felicidade: {tamagochi.happy}</Text>
        </View>
        <Pressable onPress={handleSleep} disabled={isSleeping} style={styles.sleepButton}>
          <Text style={styles.buttonText}>Dormir</Text>
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
  attributesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  sleepButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


export default BedroomScreen;


// import { router } from "expo-router";
// import { useState } from "react";
// import { Text, View, StyleSheet, Button, TouchableOpacity, Modal } from "react-native";

// const BedroomScreen = () => {
//     const [modalVisible, setModalVisible] = useState(false);

// return (

//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => setModalVisible(true)}>
//         <Text style={styles.botaoTexto}>Mostrar Alerta</Text>
//       </TouchableOpacity>

//       <Modal
//         transparent={true}
//         visible={modalVisible}
//         animationType="fade"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTexto}>Este é um alerta personalizado!</Text>
//             <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.botao}>
//               <Text style={styles.botaoTexto}>Fechar</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     modalOverlay: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente para o modal
//     },
//     modalContainer: {
//       width: 300,
//       padding: 20,
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       alignItems: 'center',
//       elevation: 10, // Sombra em dispositivos Android
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.25,
//       shadowRadius: 4, // Sombra em dispositivos iOS
//     },
//     modalTexto: {
//       fontSize: 18,
//       marginBottom: 20,
//       textAlign: 'center',
//     },
//     botao: {
//       backgroundColor: '#007bff',
//       padding: 10,
//       borderRadius: 5,
//     },
//     botaoTexto: {
//       color: '#black',
//       fontSize: 16,
//     },
//   });
    
//     /*<View style={styles.container}>
//         <Text style={styles.text}>
//             Tela do BedroomScreen
//         </Text>
//     </View>*/



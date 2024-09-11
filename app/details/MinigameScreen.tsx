// MinigameScreen.js
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MinigameScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="arrow-back" style={styles.arrowBack}
                onPress={() => {
                    router.back();
                }}/>
      <Text style={styles.text}>Bem-vindo ao Minigame!</Text>
      {/* Adicione aqui o conteúdo do seu minigame */}
    </View>
  );
};

const styles = StyleSheet.create({

  arrowBack: {
      fontSize: 32,
      color: "black",     
      marginTop: 25,
      paddingHorizontal: 10, 
      paddingVertical: 10,    
      alignSelf: 'flex-start', 
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MinigameScreen;

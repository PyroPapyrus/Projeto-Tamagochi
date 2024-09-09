// src/screens/KitchenScreen.tsx
import React, { useState } from 'react';
import { View, Image, StyleSheet, PanResponder, Animated } from 'react-native';

const KitchenScreen = () => {
  const [hunger, setHunger] = useState(50); // Valor inicial de fome
  const [fruitPosition] = useState(new Animated.ValueXY());

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: fruitPosition.x, dy: fruitPosition.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.moveY < 200) { // Ajuste conforme necessário
        setHunger((prev) => Math.min(prev + 10, 100)); // Aumenta a fome até o máximo de 100
        fruitPosition.setValue({ x: 0, y: 0 }); // Reseta a posição da fruta
      } else {
        Animated.spring(fruitPosition, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });
  return (
    <View style={styles.container}>

      <Image source={require('../../assets/images/kitchen-bakground.png')} style={styles.background} />
        <View style={styles.item}>
      <Image source={require('../../assets/images/dog.png')} style={styles.tamagochi} />
      </View>
      <Animated.Image
        source={require('../../assets/images/fruit.png')}
        style={[styles.fruit]}
        {...panResponder.panHandlers}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  item: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
  },
 
  tamagochi: {
    width: 300,
    height: 300,
  },
  fruit: {
    width: 50,
    height: 50,
    top: 50, // Ajuste conforme necessário
    alignItems: "baseline",
  },
});

export default KitchenScreen;

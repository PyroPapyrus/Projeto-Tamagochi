import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { router } from 'expo-router';
import { ImageBackground } from 'react-native';
import { Touchable } from 'react-native';

const { width, height } = Dimensions.get('window');

const SecondMinigameScreen = () => {
  const [xPos, setXPos] = useState(width / 2 - 100 / 2); // Posição inicial da cesta
  const [fruits, setFruits] = useState<{ id: number; x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [fruitSpeed, setFruitSpeed] = useState(5); // Velocidade das frutas
  const [gameOver, setGameOver] = useState(false); // Estado para verificar se o jogo acabou
  const frameId = useRef<number | null>(null); // Referência para o ID do frame

  

  // Sensibilidade do movimento da cesta
  const sensitivity = 60; // Ajuste conforme necessário

  const basketWidth = 100; // Largura da cesta
  const basketHeight = 80; // Altura da cesta

  const fruitWidth = 60; // Largura da fruta
  const fruitHeight = 60; // Altura da fruta

  // Definição das áreas de coleta
  const topCollectArea = 20; // Área de coleta superior
  const sideCollectArea = 15; // Área lateral de coleta

  // Movimentação da cesta com o acelerômetro
  useEffect(() => {
    if (gameOver) return; // Não movimentar a cesta se o jogo acabou

    Accelerometer.setUpdateInterval(100);
    const subscription = Accelerometer.addListener(accelerometerData => {
      let newXPos = xPos - accelerometerData.x * sensitivity;
      if (newXPos < 0) newXPos = 0;
      if (newXPos > width - basketWidth) newXPos = width - basketWidth;
      setXPos(newXPos);
    });

    return () => subscription.remove();
  }, [xPos, gameOver]);

  // Atualiza a posição das frutas e verifica colisões
  useEffect(() => {
    if (gameOver) return; // Não atualizar frutas se o jogo acabou

    const updateFruits = () => {
      setFruits(fruits => {
        const updatedFruits = fruits.map(fruit => ({ ...fruit, y: fruit.y + fruitSpeed }));

        // Remove frutas que saíram da tela
        const filteredFruits = updatedFruits.filter(fruit => fruit.y < height);

        // Verifica colisões e remove frutas que colidiram com a cesta
        const remainingFruits = filteredFruits.filter(fruit => {
          const fruitRight = fruit.x + fruitWidth;
          const fruitBottom = fruit.y + fruitHeight;
          const basketRight = xPos + basketWidth;
          const basketBottom = height - 50; // Posição fixa da cesta no fundo da tela

          // Verifica se a fruta está dentro da área lateral de coleta da cesta
          const isInSideCollectArea =
            (fruit.x < xPos + basketWidth + sideCollectArea && fruitRight > xPos - sideCollectArea);

          // Verifica se a fruta está dentro da área superior de coleta da cesta
          const isInTopCollectArea =
            (fruitBottom > height - basketHeight - topCollectArea) &&
            (fruit.y < height - basketHeight);

          if (
            isInSideCollectArea &&
            isInTopCollectArea &&
            fruitBottom > height - basketHeight - 50 &&
            fruit.y < basketBottom
          ) {
            setScore(score => {
              const newScore = score + 1;
              if (newScore >= 50) {
                setGameOver(true); // Acaba o jogo ao alcançar 100 frutas
              }
              return newScore;
            });
            return false; // Remove a fruta da lista
          }
          return true;
        });

        return remainingFruits;
      });

      frameId.current = requestAnimationFrame(updateFruits);
    };

    frameId.current = requestAnimationFrame(updateFruits);

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [xPos, score, fruitSpeed, gameOver]);

  // Cria novas frutas a intervalos regulares
  useEffect(() => {
    if (gameOver) return; // Não criar novas frutas se o jogo acabou

    const spawnFruit = () => {
      setFruits(fruits => {
        if (fruits.length < 6) { // Limita o número máximo de frutas na tela
          return [
            ...fruits,
            {
              id: Date.now(),
              x: Math.random() * (width - fruitWidth), // Posição X aleatória
              y: -fruitHeight, // Começa fora da tela
            },
          ];
        }
        return fruits;
      });
    };

    const spawnInterval = setInterval(spawnFruit, 500); // Frequência de criação das frutas

    return () => clearInterval(spawnInterval);
  }, [gameOver]);

  // Aumenta gradualmente a velocidade das frutas até um certo limite
  useEffect(() => {
    if (gameOver) return; // Não aumentar a velocidade se o jogo acabou

    const speedIncrement = 0.1; // Incremento de velocidade
    const maxSpeed = 10; // Velocidade máxima das frutas

    const increaseSpeed = () => {
      setFruitSpeed(prevSpeed => Math.min(prevSpeed + speedIncrement, maxSpeed));
    };

    const speedInterval = setInterval(increaseSpeed, 10000); // Aumenta a velocidade a cada 10 segundos

    return () => clearInterval(speedInterval);
  }, [gameOver]);


  const handleRestart = async () => {
    setXPos(width / 2 - basketWidth / 2);
    setFruits([]);
    setScore(0);
    setFruitSpeed(5);
    setGameOver(false);
  };

  const handleExit = () => {
    router.back();
  };

  return (

      <ImageBackground source={require('@/assets/images/backgroundSecondGame.png')} style={styles.container}>


    <View style={styles.container}>
      {gameOver ? (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Você coletou
          <Text style={styles.gameOverText2}> 50 </Text>
            frutas!
          </Text>
          

          <TouchableOpacity onPress={handleRestart} style={styles.button}>
            <Text style={styles.buttonText}>Jogar Novamente</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleExit} style={styles.button}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>

        </View>
      ) : (
        <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pontuação</Text>
          <Text style={styles.titleScore}>{score}</Text>
        </View>
          {fruits.map(fruit => (
            <View
              key={fruit.id}
              style={[
                styles.fruit,
                { left: fruit.x, top: fruit.y },
              ]}
            >
              <Image source={require('@/assets/images/golden-apple.gif')} style={styles.imageFruit} />
            </View>
          ))}
          <View style={[styles.basket, { left: xPos }]}>
            <Image source={require('@/assets/images/basket.png')} style={styles.imageBasket} />
          </View>
        </>
      )}
    </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({


  container: {
    flex: 1,
  },

  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'center',
    padding: 6,
    paddingHorizontal: 15,
    margin: 30,
    borderRadius: 5
  },

  title: {
    color: 'white',
    fontFamily: 'PixelifySansBold',
    fontSize: 24,
    textAlign: 'center',
    textShadowColor: 'red',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  titleScore: {
    color: 'orange',
    fontFamily: 'PixelifySansBold',
    fontSize: 24,
    textAlign: 'center',
    textShadowColor: 'red',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  basket: {
    position: 'absolute',
    bottom: 50,
    width: 100,
    height: 80,
  },

  imageBasket: {
    width: 100,
    height: 80,
  },
  
  fruit: {
    position: 'absolute',
    width: 60,
    height: 60,
  },

  imageFruit: {
    width: 60,
    height: 60,
  },

  button: {
    backgroundColor: 'rgba(0, 123, 255, 0.4)',
    padding: 15,
    borderRadius: 5,
    shadowColor: 'black',
  },

  buttonText: {
    fontFamily: 'PixelifySansBold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  gameOverContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    top: "40%",
    gap: 10
  },

  gameOverText: {
    fontFamily: 'PixelifySansBold',
    padding: 10,
    borderRadius: 5,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    fontSize: 24,
    marginBottom: 15,
    textShadowColor: 'red',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  gameOverText2: {
    fontFamily: 'PixelifySansBold',
    padding: 10,
    borderRadius: 5,
    color: 'orange',
    fontSize: 24,
    marginBottom: 15,
    textShadowColor: 'red',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  gameOverText3: {
    fontFamily: 'PixelifySansBold',
    padding: 10,
    borderRadius: 5,
    color: 'white',
    fontSize: 24,
    marginBottom: 15,
    textShadowColor: 'red',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

});

export default SecondMinigameScreen

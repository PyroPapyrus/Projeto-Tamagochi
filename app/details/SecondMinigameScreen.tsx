import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SecondMinigameScreen = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [x, setX] = useState(0);
  const [ballPosition, setBallPosition] = useState({ x: screenWidth / 2 - 25, y: screenHeight - 100 });
  const [obstacles, setObstacles] = useState<{ x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize the Accelerometer
  useEffect(() => {
    const _subscription = Accelerometer.addListener(accelerometerData => {
      setX(accelerometerData.x);
    });
    setSubscription(_subscription);

    return () => {
      _subscription.remove();
    };
  }, []);

  // Update ball position based on accelerometer data
  useEffect(() => {
    if (isGameOver) return;

    const moveBall = () => {
      setBallPosition(prev => ({
        x: Math.max(0, Math.min(screenWidth - 50, prev.x + x * 20)),
        y: prev.y
      }));
    };

    moveBall();
  }, [x]);

  // Update obstacles and check collisions
  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.05) {
        setObstacles(prevObstacles => [
          ...prevObstacles,
          { x: Math.random() * (screenWidth - 50), y: 0 }
        ]);
      }
      setObstacles(prevObstacles =>
        prevObstacles
          .map(obstacle => ({ ...obstacle, y: obstacle.y + 5 }))
          .filter(obstacle => obstacle.y < screenHeight)
      );

      // Check for collisions
      obstacles.forEach(obstacle => {
        if (
          ballPosition.x < obstacle.x + 50 &&
          ballPosition.x + 50 > obstacle.x &&
          ballPosition.y < obstacle.y + 50 &&
          ballPosition.y + 50 > obstacle.y
        ) {
          setIsGameOver(true);
        }
      });

      if (!isGameOver) {
        setScore(prevScore => prevScore + 1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [obstacles, ballPosition, isGameOver]);

  const resetGame = () => {
    setBallPosition({ x: screenWidth / 2 - 25, y: screenHeight - 100 });
    setObstacles([]);
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      {isGameOver && <Text style={styles.gameOver}>Game Over</Text>}
      <Animated.View
        style={[styles.ball, {
          transform: [{ translateX: ballPosition.x }, { translateY: ballPosition.y }]
        }]}
      />
      {obstacles.map((obstacle, index) => (
        <View
          key={index}
          style={[styles.obstacle, {
            transform: [{ translateX: obstacle.x }, { translateY: obstacle.y }]
          }]}
        />
      ))}
      <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
        <Text style={styles.resetText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    position: 'absolute',
  },
  obstacle: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    position: 'absolute',
  },
  resetButton: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
    backgroundColor: 'gray',
  },
  resetText: {
    color: 'white',
  },
  score: {
    position: 'absolute',
    top: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  gameOver: {
    position: 'absolute',
    top: screenHeight / 2 - 50,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default SecondMinigameScreen;

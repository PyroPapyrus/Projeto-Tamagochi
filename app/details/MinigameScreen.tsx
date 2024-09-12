import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const MinigameScreen = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // 10 segundos de jogo
  const [loading, setLoading] = useState(false); // Estado de carregamento para exibir "Carregando..."
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Inicia o jogo
  const startGame = () => {
    setScore(0); // Reinicia a pontuação
    setTimeLeft(10); // Tempo inicial de 10 segundos
    setGameStarted(true); // Começa o jogo
    setLoading(false); // Reseta o estado de carregamento

    // Iniciar cronômetro
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          endGame(); // Chama a função para encerrar o jogo
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Função para encerrar o jogo e atualizar a pontuação
  const endGame = () => {
    setGameStarted(false); // Encerra o jogo
    setLoading(true); // Exibe "Carregando..." enquanto a pontuação é atualizada

    // Atualiza a melhor pontuação se a pontuação atual for maior
    if (score > bestScore) {
      setBestScore(score);
    }

    // Simula um delay para mostrar "Carregando..." e então esconder
    setTimeout(() => {
      setLoading(false); // Esconde "Carregando..." após a atualização
    }, 500); // Simula um atraso de 500ms para a atualização
  };

  // Função que incrementa o score a cada toque
  const handleTap = () => {
    if (gameStarted) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Toque Rápido</Text>

      {!gameStarted && (
        <>
          {loading ? (
            <Text style={styles.loadingText}>Carregando...</Text>
          ) : (
            <Text style={styles.bestScoreText}>Melhor Pontuação: {bestScore}</Text>
          )}
          <Button title="Iniciar Jogo" onPress={startGame} />
        </>
      )}

      {gameStarted && (
        <>
          <Text style={styles.timeLeftText}>Tempo Restante: {timeLeft}s</Text>
          <Text style={styles.scoreText}>Pontuação: {score}</Text>

          <TouchableOpacity style={styles.tapArea} onPress={handleTap}>
            <Text style={styles.tapText}>Toque!</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bestScoreText: {
    fontSize: 18,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'gray',
  },
  timeLeftText: {
    fontSize: 18,
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
  },
  tapArea: {
    width: 200,
    height: 200,
    backgroundColor: '#ff6347',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  tapText: {
    fontSize: 24,
    color: 'white',
  },
});

export default MinigameScreen;

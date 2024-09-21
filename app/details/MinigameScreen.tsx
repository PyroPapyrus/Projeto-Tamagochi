import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

/**
 * Componente MinigameScreen
 * Este componente representa um minigame onde o usuário tem 10 segundos para tocar em uma área da tela
 * o maior número de vezes possível para acumular pontos.
 */
const MinigameScreen = () => {
  // Estado para indicar se o jogo começou ou não
  const [gameStarted, setGameStarted] = useState(false);
  // Estado para armazenar a pontuação atual
  const [score, setScore] = useState(0);
  // Estado para armazenar a melhor pontuação alcançada
  const [bestScore, setBestScore] = useState(0);
  // Estado para armazenar o tempo restante de jogo (inicialmente 10 segundos)
  const [timeLeft, setTimeLeft] = useState(10);
  // Estado de carregamento para exibir "Carregando..." ao final do jogo
  const [loading, setLoading] = useState(false);
  // Referência para o timer que controla o tempo de jogo
  const timerRef = useRef<NodeJS.Timeout | null>(null);


   /**
   * Efeito que atualiza a melhor pontuação (bestScore) sempre que a pontuação (score) muda.
   * Se a pontuação atual for maior que a melhor pontuação, ela é atualizada.
   */
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);


  /**
   * Função que inicia o jogo.
   * - Reinicia a pontuação e o tempo
   * - Inicia o cronômetro que decrementa o tempo a cada segundo
   */
  const startGame = () => {
    setScore(0); // Reinicia a pontuação
    setTimeLeft(10); // Tempo inicial de 10 segundos
    setGameStarted(true); // Marca o jogo como iniciado
    setLoading(false); // Reseta o estado de carregamento

    // Inicia o cronômetro que decrementa o tempo
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!); // Para o cronômetro
          endGame(); // Chama a função para encerrar o jogo
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

    /**
   * Função que encerra o jogo.
   * - Para o cronômetro e exibe o estado de carregamento por 500ms
   */
  const endGame = () => {
    setGameStarted(false); // Encerra o jogo
    setLoading(true); // Exibe "Carregando..." enquanto a pontuação é atualizada

    // Simula um delay para mostrar "Carregando..." e então esconder
    setTimeout(() => {
      setLoading(false); // Esconde "Carregando..." após a atualização
    }, 500); // Simula um atraso de 500ms para a atualização
  };


   /**
   * Função chamada ao tocar na área de jogo.
   * - Incrementa a pontuação se o jogo estiver em andamento
   * - Se a pontuação atingir 100, o jogo termina automaticamente
   */
  const handleTap = () => {
    if (gameStarted) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        
        // Verifica se o jogador atingiu 100 pontos e encerra o jogo
        if (newScore >= 100) {
          clearInterval(timerRef.current!); // Para o cronômetro
          endGame(); // Encerra o jogo
        }

        return newScore;
      });
    }
  };

  return (
    <ImageBackground source={require('@/assets/images/background-minigame.jpg')} style={styles.container}>


        {!gameStarted && (
          <>   
            <View style={styles.textContainer}>
              <Text style={styles.title}>{'<'}Jogo do Toque Rápido{'/>'}</Text>
                {loading ? (
                  <Text style={styles.loadingText}>Carregando...</Text>
                ) : (
                  <Text style={styles.bestScoreText}>Melhor Pontuação: {bestScore}</Text>
                )} 
            </View>

            <TouchableOpacity onPress={startGame} style={styles.button}> 
              <Text style={styles.textButton}>Iniciar Jogo</Text>
            </TouchableOpacity>
          </>
          
        )}
      

      {gameStarted && (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.timeLeftText}>Tempo Restante: {timeLeft}s</Text>
            <Text style={styles.scoreText}>Pontuação: {score}</Text>
          </View>


          <TouchableOpacity style={styles.tapArea} onPress={handleTap}>
            <Text style={styles.tapText}>Toque!</Text>
          </TouchableOpacity>
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems:'center',
  },

  textButton: {
    color: 'white',
    fontFamily: 'PixelifySansBold',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  button: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(0, 123, 255, 0.7)',
    padding: 15,
    borderRadius: 5,
  },

  title: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'PixelifySansBold',
    marginBottom: 5,
    textShadowColor: 'red',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  bestScoreText: {
    color: 'darkorange',
    fontFamily: 'PixelifySansBold',
    fontSize: 18,
    marginBottom: 10,
    textShadowColor: 'red',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  
  loadingText: {
    fontFamily: 'PixelifySansBold',
    fontSize: 18,
    marginBottom: 10,
    color: 'gray',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  timeLeftText: {
    color: 'white',
    fontFamily: 'PixelifySansBold',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  scoreText: {
    color: 'darkorange',
    fontFamily: 'PixelifySansBold',
    fontSize: 20,
    marginBottom: 20,
    textShadowColor: 'red',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  tapArea: {
    marginTop: 20,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255, 78, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  tapText: {
    fontFamily: 'PixelifySansBold',
    fontSize: 24,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
});

export default MinigameScreen;

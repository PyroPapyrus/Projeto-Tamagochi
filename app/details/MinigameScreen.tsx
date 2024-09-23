import { TamagochiType } from '@/assets/images/TamagochiImages';
import { Tamagochi, useTamagochiDatabase } from '@/database/tamagochiDatabase';
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import { getTamagochiImage } from '@/utils/getTamagochiImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

/**
 * Componente MinigameScreen
 * Este componente representa um minigame onde o usuário tem 15 segundos para tocar em uma área da tela
 * o maior número de vezes possível para acumular pontos.
 */


const MinigameScreen: React.FC = () => {
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

  const route = useRoute(); // Acessa os parâmetros da rota
  const { tamagochiId } = route.params as { tamagochiId: number }; // Recebe o ID do tamagochi
  const [tamagochi, setTamagochi] = useState<Tamagochi | null>(null); // Armazena os dados do tamagochi
  const database = useTamagochiDatabase(); // Acessa o banco de dados do tamagochi

  // Função que busca os dados do tamagochi no banco de dados
  const fetchTamagochi = async () => {
    const tamagochiData = await database.findTamagochiById(tamagochiId);
    setTamagochi(tamagochiData);
    await AsyncStorage.setItem('tamagochi', JSON.stringify(tamagochiData)); // Armazena no AsyncStorage
  };

  // Efeito que busca os dados toda vez que a tela é focada
  useFocusEffect(
    React.useCallback(() => {
      fetchTamagochi();
    }, [tamagochiId])
  );

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
    setTimeLeft(15); // Tempo inicial de 15 segundos
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
  const handleTap = async () => {
    if (gameStarted) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        
        // Verifica se o jogador atingiu 100 pontos e encerra o jogo
        if (newScore >= 100) {
          clearInterval(timerRef.current!); // Para o cronômetro
          
          const updateStatusHappy = async () => {
            if (tamagochi) {
              const newHappy = Math.min(tamagochi.happy + 20, 100); // Aumenta a felicidade em 20 (máximo 100)
              await database.updateHappy(tamagochi.id, newHappy);
              const updatedTamagochi = { ...tamagochi, happy: newHappy };
              setTamagochi(updatedTamagochi);
              await AsyncStorage.setItem('tamagochi', JSON.stringify(updatedTamagochi));
            }
          }
          endGame(); // Encerra o jogo
          updateStatusHappy();
        }



        return newScore;
      });
    }
  };

    // Exibe um texto de carregamento enquanto os dados não foram carregados
    if (!tamagochi) {
      return <Text>Carregando...</Text>;
    }

  const status = calculateTamagochiStatus(tamagochi.hunger, tamagochi.sleep, tamagochi.happy);

  return (
    <ImageBackground source={require('@/assets/images/background-minigame.jpg')} style={styles.container}>


        {!gameStarted && (
          <>   
            <View style={styles.textContainer}>
              <Text style={styles.title}>{'<'}Jogo do Toque Rápido{'/>'}</Text>
              
                  <Text style={styles.title2}>Alcance
                    <Text style={styles.metaText}> 100 pontos</Text>
                    <Text style={styles.title2}> antes que o tempo acabe!</Text>
                  </Text>
                  
                  
               
            </View>

            <TouchableOpacity onPress={startGame} style={styles.button}> 
              <Text style={styles.textButton}>Iniciar Jogo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={router.back} style={styles.exitButton}> 
              <Text style={styles.textButton}>Sair</Text>
            </TouchableOpacity>
          </>
          
        )}
      

      {gameStarted && (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.timeLeftText}>Tempo Restante: {timeLeft}s</Text>
            <Text style={styles.scoreText}>Pontuação:
              <Text style={styles.statusNumber}> {score}</Text>
            </Text>
          </View>


          <TouchableOpacity style={styles.tapArea} onPress={handleTap}>
            <Image source={getTamagochiImage(status, tamagochi.tamagochi_id as TamagochiType)} style={styles.image} />
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
  
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },

  textContainer: {
    padding: 20,
    paddingHorizontal: 30,
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
    bottom: 75,
    backgroundColor: 'rgba(0, 123, 255, 0.7)',
    padding: 15,
    borderRadius: 5,
  },

  exitButton: {
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

  title2: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'PixelifySansBold',
    marginBottom: 5,
    textShadowColor: 'red',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  metaText: {
    textAlign: 'center',
    color: 'darkorange',
    fontFamily: 'PixelifySansBold',
    fontSize: 18,
    marginBottom: 10,
    textShadowColor: 'red',
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

  statusNumber: {
    fontFamily: 'Micro5',
    textAlign: 'center',
    color: 'darkorange',
    padding: 10,
    borderRadius: 10,
    fontSize: 27,
    textShadowColor: 'red',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },

  tapArea: {
    marginTop: 20,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  tapText: {
    fontFamily: 'PixelifySansBold',
    fontSize: 24,
    position: 'absolute',
    bottom: 8,
    color: 'white',
    textShadowColor: 'red',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
});

export default MinigameScreen;

import PlayPauseButton from "@/components/ButtonPlayPause";
import { Audio } from "expo-av";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const index = () => {
   // Estados para controlar o áudio e seu estado de reprodução
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

   // Função assíncrona para carregar o som e configurá-lo para tocar em loop
  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('@/assets/audios/invention_ - Wingspan.mp3'),
       { shouldPlay: true, isLooping: true }
    );
    setSound(sound); // Salva o objeto de som no estado
  }

    // useEffect para carregar o som assim que o componente for montado
  useEffect(() => {
    loadSound();

      // Limpa o som quando o componente for desmontado
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

   // Função para alternar entre tocar e pausar o áudio
  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };
  

    return (
       // Tela com imagem de fundo e botões
      
    <ImageBackground source={require('@/assets/images/background3.png')} style={styles.background}>

    <SafeAreaView style={styles.playButton} >
      <TouchableOpacity>
        <PlayPauseButton isPlaying={isPlaying} onPress={togglePlayPause} />
      </TouchableOpacity>
    </SafeAreaView>

    <SafeAreaView style={styles.credits} >
      <Text style={styles.textCredits}>Créditos:{'\n'}Walter,{'\n'}Emanuel</Text>
    </SafeAreaView>

      <SafeAreaView style={styles.logoContainer}>
          <Text style={styles.logoText} >PROJETO</Text>
          <Text style={styles.logoText2} >TAMAGOTCHI</Text>
          <Image style={styles.logo} source={require('@/assets/images/pinguim/pinguim-dance-unscreen.gif')}></Image>
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
        <Link href={"/CreateTamagochiScreen"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Criar  Tamagochi</Text>
          </TouchableOpacity>
        </Link>

        <Link href={"/ListTamagochi"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Lista  Tamagochi</Text>
          </TouchableOpacity>
        </Link>

        </SafeAreaView>

      </ImageBackground>

    );

}

const styles = StyleSheet.create({

    background: {
      flex: 1,
      backgroundColor: 'white'
    },

    container: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 105
    },

    text: {
      fontFamily: 'PixelifySansBold',
      color: "#fff",
      textShadowColor: 'black',
      textShadowOffset: { width: -2, height: 2 },
      textShadowRadius: 1,
    },

    button: {
      backgroundColor: 'rgba(0, 123, 255, 0.4)',
      padding: 15,
      margin: 5,
      borderRadius: 5,
      shadowColor: 'black',
    },

    logoContainer: {
      alignItems: 'center',
      marginTop: 150,
    },

    logoText: {
      fontFamily: 'PixelifySansBold',
      color: "#fff",
      fontSize: 38,
      textAlign: 'center',
      textShadowColor: '#db6018',
      textShadowOffset: { width: -2, height: 4 },
      textShadowRadius: 1,
      marginTop: 10,
    },

    logoText2: {
      fontFamily: 'PixelifySansBold',
      color: "orange",
      fontSize: 45,
      position: 'absolute',
      top: 40,
      textAlign: 'center',
      textShadowColor: 'red',
      textShadowOffset: { width: -2, height: 4 },
      textShadowRadius: 1,
    },

    logo: {
      width: 200,
      height: 200,
      opacity: 0.1,
      marginTop: 120,
      alignSelf: 'center'
    },

    playContainer: {
      backgroundColor: 'white'
    },

    playButton: {
      position: 'absolute',
      top: 0,
      right: 0
    },

    credits: {
      position: 'absolute',
      top: 35,
      left: 15
    },

    textCredits: {
      fontFamily: 'PixelifySansBold',
      color: 'white',
      fontSize: 10
    }
    
  });

export default index;
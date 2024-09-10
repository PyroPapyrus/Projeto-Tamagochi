import { Audio } from "expo-av";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, Image, Pressable, Button, TouchableOpacity } from "react-native";

const index = () => {

  const [sound, setSound] = useState<Audio.Sound | null>(null);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/audios/invention_ - Wingspan.mp3'),
       { shouldPlay: true, isLooping: true }
    );
    setSound(sound);
  }

  useEffect(() => {
    playSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

    return (
      
    <ImageBackground source={{ uri: 'https://wallpapers.com/images/hd/small-memory-art-smartphone-background-3mb6tn8a4554t5k2.jpg' }} style={styles.container}>

      <SafeAreaView style={styles.logoContainer}>
          <Text style={styles.logoText}>PROJETO{'\n'}TAMAGOCHI</Text>

          <Image style={styles.logo} source={require('./pinguim-dance-unscreen.gif')}></Image>
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
 
        <Link href={"/CreateTamagochiScreen"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Criar tamagochi</Text>
          </TouchableOpacity>
        </Link>

        <Link href={"/ListTamagochi"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Lista tamagochi</Text>
          </TouchableOpacity>
        </Link>

        </SafeAreaView>

      </ImageBackground>

    );
}

const styles = StyleSheet.create({

    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },

    text: {
      color: "#fff",
      fontWeight: 'bold',
    },

    button: {
      backgroundColor: '#007bff',
      padding: 15,
      margin: 5,
      borderRadius: 5,
      elevation: 20,  
    },

    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 2,
    },

    logoText: {
      color: "#fff",
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center',
      textShadowColor: 'lightblack',
      textShadowOffset: { width: -2, height: 5 },
      textShadowRadius: 15,
      margin: 20,
      marginTop: 250,
      elevation: 20
    },

    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
      opacity: 0.1,
      
    }
    
  });

export default index;
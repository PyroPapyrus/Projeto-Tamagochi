import { Link } from "expo-router";
import { ImageBackground, SafeAreaView, StyleSheet, Text, Image, Pressable } from "react-native";

const index = () => {

    return (
      
    <ImageBackground source={{ uri: 'https://wallpapers.com/images/hd/small-memory-art-smartphone-background-3mb6tn8a4554t5k2.jpg' }} style={styles.container}>

      <SafeAreaView style={styles.logoContainer}>
          <Text style={styles.logoText}>PROJETO TAMAGOCHI</Text>

          <Image style={styles.logo} source={require('./pinguim-dance-unscreen.gif')}></Image>
      </SafeAreaView>

      <SafeAreaView style={styles.container}>

        <Pressable style={styles.button}>
            <Text>
              <Link style={styles.text}
               href={"/(tabs)"}>Tela de tabs</Link>
            </Text>
        </Pressable>

          <Pressable style={styles.button}>
            <Text>
              <Link style={styles.text}
               href={"/CreateTamagochiScreen"}>Criar tamagochi</Link>
            </Text>
          </Pressable>

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
      borderWidth: 5,
      borderColor: 'green',
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
      margin: 10,
      elevation: 20
    },

    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
      opacity: 0.5
    }
    
  });

export default index;
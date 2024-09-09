import { Link, router } from "expo-router";
import { Text, View, StyleSheet, Button, ImageBackground } from "react-native";

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
        color: "orange",
        textShadowColor: 'black', // Cor da sombra
        textShadowOffset: { width: 1, height: 2 }, // Deslocamento da sombra
        textShadowRadius: 10, // Suavidade da sombra
    }
})

const index = () => {
    return (

        <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/77/4f/58/774f58cfae4e15311228739bf5b9ab46.jpg'}} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Tela do Index
                </Text>
        
                <Button 
                    title="Voltar pra tela inicial"
                    onPress={() => {
                        router.back();
                    }}
                />
                
            </View>
        </ImageBackground>
    );
}

export default index;

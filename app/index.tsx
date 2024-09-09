import { Link, router } from "expo-router";
import { Button, SafeAreaView, StyleSheet, Text } from "react-native";

const index = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Tela inicial</Text>
            
            <Text>
              <Link style={styles.text}
               href={"/(tabs)"}>Clique aqui para ir a tela de tabs</Link>
            </Text>

            <Button 
            title="Botao teste (n tem funcionalidade)"
            onPress={() =>{} }  
            />

            <Text>
              <Link style={styles.text}
               href={"/CreateTamagochiScreen"}>Clique aqui para ir a tela de tabs</Link>
            </Text>

        </SafeAreaView>



    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      padding: 24,
    },
    text: {
      color: "red"
    }
    
  });

export default index;
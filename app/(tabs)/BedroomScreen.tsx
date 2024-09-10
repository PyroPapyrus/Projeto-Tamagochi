import { router } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, Modal } from "react-native";

/*const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    text: {
        color: "orange",
    },
    background: {
        color: 'red',
    },
})*/

const BedroomScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);

return (

    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.botaoTexto}>Mostrar Alerta</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTexto}>Este é um alerta personalizado!</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.botao}>
              <Text style={styles.botaoTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente para o modal
    },
    modalContainer: {
      width: 300,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
      elevation: 10, // Sombra em dispositivos Android
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4, // Sombra em dispositivos iOS
    },
    modalTexto: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },
    botao: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
    },
    botaoTexto: {
      color: '#black',
      fontSize: 16,
    },
  });
    
    /*<View style={styles.container}>
        <Text style={styles.text}>
            Tela do BedroomScreen
        </Text>
    </View>*/

export default BedroomScreen;

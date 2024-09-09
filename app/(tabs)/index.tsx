import { Link, router } from "expo-router";
import { Text, View, StyleSheet, Button } from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    text: {
        color: "orange",
    }
})

const index = () => {
    return (
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
    );
}

export default index;

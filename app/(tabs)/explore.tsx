import { router } from "expo-router";
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

const explore = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Tela do explore
            </Text>

        </View>
    );
}

export default explore;
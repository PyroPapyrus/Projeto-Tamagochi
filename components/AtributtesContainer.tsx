import { StyleSheet } from "react-native";
import { View } from "react-native";

const AtributtesContainer = ({ children }) => {
    return (
    
        <View style={style.atributtesContainer}>{children}</View>
        
    );
}

const style = StyleSheet.create({

    atributtesContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        marginTop: 30,
        padding: 5,
        shadowColor: 'white',
        elevation: 7,
      },

})

export default AtributtesContainer;
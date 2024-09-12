import { StyleSheet } from "react-native";
import { View } from "react-native";

const HungerContainer = ({ children }) => {
    return (
    
        <View style={style.hungerContainer}>{children}</View>
        
    );
}

const style = StyleSheet.create({

    hungerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start', 
        backgroundColor: 'rgba(229, 43, 20, 0.4)',
        padding: 5,
        borderRadius: 5,
        paddingHorizontal: 15
    },

})

export default HungerContainer;
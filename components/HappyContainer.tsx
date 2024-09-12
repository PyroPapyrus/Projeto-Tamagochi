import { StyleSheet, View } from "react-native";

const HappyContainer = ({ children }) => {
    return (
        <View style={style.happyContainer}>{children}</View>
    );
}

const style = StyleSheet.create({
    happyContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start', 
        backgroundColor: 'rgba(8, 132, 229, 0.4)',
        padding: 5,
        borderRadius: 5,
        paddingHorizontal: 10
      }
})

export default HappyContainer;
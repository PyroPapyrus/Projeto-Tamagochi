import { StyleSheet, View } from "react-native";

const SleepContainer = ({ children }) => {
    return (
        <View style={style.sleepContainer}>{children}</View>
    );
}

const style = StyleSheet.create({
    sleepContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start', 
        backgroundColor: 'rgba(152, 8, 229, 0.4)',
        padding: 5,
        borderRadius: 5,
        paddingHorizontal: 15
      },    
})

export default SleepContainer;
import { StyleSheet, View } from "react-native";

const StatusContainer = ({ children }) => {
    return (
        <View style={style.statusContainer}>{children}</View>
    );
}

const style = StyleSheet.create({

    statusContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        shadowColor: 'white',
        elevation: 7,
    }
})

export default StatusContainer;
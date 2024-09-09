// BedroomScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BedroomScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Quarto</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BedroomScreen;
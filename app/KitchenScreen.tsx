// KitchenScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const KitchenScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Cozinha</Text>
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

export default KitchenScreen;
// OutsideScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OutsideScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Lado de Fora</Text>
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

export default OutsideScreen;
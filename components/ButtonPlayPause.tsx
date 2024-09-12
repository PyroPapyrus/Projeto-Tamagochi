import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onPress: () => void;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ isPlaying, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    marginVertical: 25,
    marginHorizontal: 10,
    padding: 10,

    backgroundColor: 'orange'
  },
});

export default PlayPauseButton;

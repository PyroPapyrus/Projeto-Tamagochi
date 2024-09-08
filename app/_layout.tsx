import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
=======
>>>>>>> c0d260eddb16bfee3e2ddfb496401f3d0ef6a5b7

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
<<<<<<< HEAD
        <Stack.Screen name='index' />
=======
>>>>>>> c0d260eddb16bfee3e2ddfb496401f3d0ef6a5b7
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkblue",
    flex: 1,
    padding: 24,
  }
  
});
=======
>>>>>>> c0d260eddb16bfee3e2ddfb496401f3d0ef6a5b7

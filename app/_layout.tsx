// RootLayout.tsx
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SQLiteProvider } from 'expo-sqlite';
import { initDatabase } from '@/database/initDatabase';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  index: undefined;
  CreateTamagochiScreen: undefined;
  ListTamagochi: undefined;
  TamagochiDetails: { tamagochiId: number };
  "(tabs)": undefined;
  "+not-found": undefined;
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'PixelifySansBold': require('@/assets/fonts/PixelifySans-Bold.ttf'),
    'PixelifySansMedium': require('@/assets/fonts/PixelifySans-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

 
  return (
    <SQLiteProvider databaseName='Tamagochi.db' onInit={initDatabase}>

        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false} }/>
          <Stack.Screen name='CreateTamagochiScreen' options={{ headerShown: false }} />
          <Stack.Screen name='ListTamagochi' options={{ headerShown: false }} />
          <Stack.Screen name='TamagochiDetails' options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>

    </SQLiteProvider>
  );
}

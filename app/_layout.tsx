// RootLayout.tsx
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SQLiteProvider } from 'expo-sqlite';
import { initDatabase } from '@/database/initDatabase';

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
  // Carrega as fontes personalizadas.
  const [loaded, error] = useFonts({
    'PixelifySansBold': require('@/assets/fonts/PixelifySans-Bold.ttf'),
    'PixelifySansMedium': require('@/assets/fonts/PixelifySans-Medium.ttf'),
    'Micro5': require('@/assets/fonts/Micro5-Regular.ttf'),
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
      // Provedor do banco de dados SQLite.
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

import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
<<<<<<< HEAD

      />

        <Tabs.Screen
      
        name='teste'
        options={{
          title:'Teste',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'balloon' :
               'balloon-outline'}
                color={color} />
            ),
        }}
      
      />
      
=======
      />
>>>>>>> c0d260eddb16bfee3e2ddfb496401f3d0ef6a5b7
    </Tabs>
  );
}

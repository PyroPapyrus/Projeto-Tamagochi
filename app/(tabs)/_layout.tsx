import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Pressable, Text } from 'react-native';
import { Icon, ScreenWidth } from '@rneui/base';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
    
      <Tabs.Screen
        name='index'
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#3498db' : 'gray', fontSize: 10 }}>Home</Text>

          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome6 name="house" size={20} color={focused ? '#3498db' : 'gray'} />
          ),
        }}
      />
      <Tabs.Screen

        name='BedroomScreen'
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#f1c40f' : 'gray', fontSize: 10 }}>Bedroom</Text>

          ),
          tabBarIcon: ({ focused }) => (
            <Icon name="bedroom-parent" size={24} color={focused ? '#f1c40f' : 'gray'} />
          ),
        }}

      />

        <Tabs.Screen
      
        name='KitchenScreen'
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#27ae60' : 'black', fontSize: 10 }}>Kitchen</Text>

          ),
          tabBarIcon: ({ focused }) => (
            <Icon name="kitchen" size={24} color={focused ? '#27ae60' : 'gray'} />
            ),
        }}
      
      />
      
    </Tabs>
  );
}

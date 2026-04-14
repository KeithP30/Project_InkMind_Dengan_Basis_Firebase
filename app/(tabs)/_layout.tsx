import { Redirect, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';


import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { auth } from '@/lib/firebase';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(Boolean(user));
      setIsReady(true);
    });
    return unsubscribe;
  }, []);

  if (!isReady) return null;
  if (!isLoggedIn) return <Redirect href="/login" />;

  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    headerShown: false,
    tabBarButton: HapticTab,
  }}
>
  <Tabs.Screen
    name="index"
    options={{ title: "Home" }}
  />

  <Tabs.Screen
    name="characters"
    options={{ title: "Characters" }}
  />
  <Tabs.Screen 
  name="scenes" 
  options={{ title: "Scenes" }} 
  />
</Tabs>


  );
}

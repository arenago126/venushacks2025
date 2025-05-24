import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs screenOptions={{ headerShown: false }} initialRouteName="dashboard">
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
<<<<<<< HEAD
          name="chatbot"
          options={{
            title: 'Chatbot',
            tabBarIcon: ({ color }) => <MaterialIcons name="chat" size={24} color={color} />,
=======
          name="calculator"
          options={{
            title: 'Calculator',
            tabBarIcon: ({ color }) => <MaterialIcons name="calculate" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="my finances"
          options={{
            title: 'my finances',
            tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
>>>>>>> a797b12149a6689a2ef5d467cba4b95088c5d261
          }}
        />
      </Tabs>
      {/* This is where you can add your main content or other components */}
    </GestureHandlerRootView>
  );
}

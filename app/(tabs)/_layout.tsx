import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} initialRouteName="dashboard">
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ color }) => <MaterialIcons name="calculate" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'Chatbot',
          tabBarIcon: ({ color }) => <MaterialIcons name="chat" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

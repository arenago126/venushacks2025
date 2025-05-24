import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs screenOptions={{ headerShown: false }} initialRouteName="index">
        <Tabs.Screen
          name="index"
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
          name="myfinances"
          options={{
            title: 'Finances',
            tabBarIcon: ({ color }) => <MaterialIcons name="account-balance" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="chatbot"
          options={{
            title: 'Chatbot',
            tabBarIcon: ({ color }) => <MaterialIcons name="comment-bank" size={24} color={color} />,
          }}
        />
      </Tabs>
      {/* This is where you can add your main content or other components */}
    </GestureHandlerRootView>
  );
}

import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="tickets" options={{ title: 'Tickets' }} />
      <Tabs.Screen name="inbox" options={{ title: 'Inbox' }} />
      <Tabs.Screen name="fan-id" options={{ title: 'Fan ID' }} />
      <Tabs.Screen name="benefits" options={{ title: 'Benefits' }} />
      <Tabs.Screen name="merch" options={{ title: 'Merch' }} />
    </Tabs>
  );
}

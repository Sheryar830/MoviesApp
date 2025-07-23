import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './components/navigation/appNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import "./global.css"
export default function App() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-neutral-800 overflow-hidden">
        <AppNavigation />
      </View>
    </SafeAreaProvider>
  );
}
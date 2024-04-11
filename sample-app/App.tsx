import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DemoScreen, Theme, ThemeContext } from 'react-native-boxes'
import { SafeAreaProvider } from 'react-native-safe-area-context';
2
export default function App() {
  const theme = new Theme()
  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaProvider>
        <DemoScreen />
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

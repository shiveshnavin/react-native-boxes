import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DemoScreen, Theme, ThemeContext } from 'react-native-boxes'
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const theme = new Theme()

  loadAsync({
    'Regular': require('./assets/fonts/Regular.ttf'),
    'Bold': require('./assets/fonts/Bold.ttf'),
    'Styled': require('./assets/fonts/Styled.ttf'),
  })
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
function loadAsync(arg0: { Regular: any; Bold: any; Styled: any; }) {
  throw new Error('Function not implemented.');
}


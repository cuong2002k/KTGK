import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { MyContextControllerProvider } from './Store';
import MyRouter from './Router/MyRouter';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <MyRouter />
      </NavigationContainer>
    </MyContextControllerProvider>

    // <Login />

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

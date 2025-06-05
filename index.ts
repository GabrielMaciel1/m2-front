import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';
import App from './App';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

registerRootComponent(App);

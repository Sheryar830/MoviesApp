import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);


export const theme = {
  background: '#eab308',
  text: '#eab308'
};

export const styles = {
  text: { color: theme.text },
  background: { backgroundColor: theme.background }
};
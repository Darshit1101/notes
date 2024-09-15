import './App.css';
import en from '@shopify/polaris/locales/en.json';//shopify polaris
import { AppProvider } from '@shopify/polaris';//shopify polaris
import '@shopify/polaris/build/esm/styles.css';//shopify polaris
import Test from './components/Testing/Test';

function App() {
  return (
    <AppProvider i18n={en}>
      <Test />
    </AppProvider>
  );
}

export default App;

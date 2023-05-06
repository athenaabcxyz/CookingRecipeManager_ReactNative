import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './screens/mainscreen';
import RecipeItem from './itemComponents/recipeItem';

export default function App() {
  return (
    MainScreen()
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

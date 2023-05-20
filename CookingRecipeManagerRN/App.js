import { StyleSheet, Text, View } from 'react-native';
import RecipeDetail from './screens/recipedetail';
import MainScreen from './screens/mainscreen';
import RecipeInstruction from './screens/recipeinstruction';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeItem from './itemComponents/recipeItem';
import AdvanceSearch from './screens/advanceSearch';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName='Dishes'
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Dishes' component={MainScreen}/>
          <Stack.Screen name='Detail' component={RecipeDetail}/>
          <Stack.Screen name='Recipe' component={RecipeItem}/>
          <Stack.Screen name='Instruction' component={RecipeInstruction}/>
        </Stack.Navigator>
      </NavigationContainer>
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

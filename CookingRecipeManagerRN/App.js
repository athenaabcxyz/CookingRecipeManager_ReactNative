import { StyleSheet, Text, View } from 'react-native';
import RecipeDetail from './screens/recipedetail';
import MainScreen from './screens/mainscreen';
import RecipeInstruction from './screens/recipeinstruction';
import LoginScreen from './screens/loginscreen'
import RegisterScreen from './screens/registerscreen'
import IngredientSelect from './screens/ingredientselect'
import SearchResult from './screens/searchresult'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeItem from './itemComponents/recipeItem';
import React, { useState, useEffect } from 'react';
import User from './screens/userscreen';
import ResetPassword from './screens/resetpasswordscreen';


const Stack = createNativeStackNavigator();


export default function App() {
  
  return (

      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName='Login'
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Reset' component={ResetPassword}/>
          <Stack.Screen name='User' component={User}/>
          <Stack.Screen name='Dishes' component={MainScreen}/>
          <Stack.Screen name='Detail' component={RecipeDetail}/>
          <Stack.Screen name='Recipe' component={RecipeItem}/>
          <Stack.Screen name='Instruction' component={RecipeInstruction}/>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='IngredientSelect' component={IngredientSelect} />
          <Stack.Screen name='SearchResult' component={SearchResult} />
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

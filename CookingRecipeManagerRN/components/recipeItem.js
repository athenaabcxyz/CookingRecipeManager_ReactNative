import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    Alert
} from 'react-native'


function RecipeItem({ item }) { 
    const url='https://spoonacular.com/recipeImages/1160166-556x370.jpg'
    return (
        <View style={{
            padding: 5
        }}>
            <Image 
            source={{uri: url}}
                style={{
                    width: 100,
                    backgroundColor: 'red',
                    height: 100,
                }} />
            <Text style={{
                textAlign: 'center'
            }}>Food Name here</Text>

            <View style={{
                flexDirection: 'row',
            }}>
                
            </View>
        </View>
    )
}

export default RecipeItem
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'


import TextTicker from 'react-native-text-ticker';


function IngredientItem3({ item }) {

    let imageURL = "https://spoonacular.com/cdn/ingredients_100x100/" + item.image;

    const words = item.name.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    let ingredientName = words.join(" ");

    return (
        <View
            style={{
                height: 50,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
                marginTop: 5,
                marginStart: 0,
                flexDirection: 'row',
                borderRadius: 10,
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: 'green'
            }}>
            <Image
                style={{
                    width: 35,
                    height: 35,
                    marginTop: 0,
                    resizeMode: 'cover',
                    borderRadius: 5,
                    marginRight: 15,
                }}
                source={{
                    uri: imageURL
                }} />
            <View style={{
                flex: 1,
                marginRight: 10
            }}>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>{ingredientName}</Text>             
            </View>
        </View>
    )
}

export default IngredientItem3
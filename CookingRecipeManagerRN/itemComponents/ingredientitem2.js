import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'


import TextTicker from 'react-native-text-ticker';


function IngredientItem2({ item }) {

    let imageURL = "https://spoonacular.com/cdn/ingredients_100x100/" + item.image;

    const words = item.name.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    let ingredientName = words.join(" ");

    return (
        <View
            style={{
                width: 100,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
                marginTop: 5,
                marginStart: 5,
                flexDirection: 'column',
                borderRadius: 10,
                backgroundColor: 'white',
                alignitems: 'center'
            }}>
            <Image
                style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'cover',
                    borderRadius: 5,
                    borderColor: 'green',
                    marginTop: 5,
                    marginStart: 5,
                    borderWidth: 2
                }}
                source={{
                    uri: imageURL
                }} />
            <View style={{
                flex: 1,
                marginRight: 10,
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

export default IngredientItem2
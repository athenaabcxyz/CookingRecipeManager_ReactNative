import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';

import TextTicker from 'react-native-text-ticker';


function RecipeItem({ item, onPress }) {

    let dishTypeList = '';
    let cuisinesList = '';

    if (item.dishTypes != undefined)
    {
        item.dishTypes.forEach(element => {
            dishTypeList = dishTypeList + element + ", ";
        });
    dishTypeList = dishTypeList.substring(0, dishTypeList.length - 2);
    }

    if(item.cuisines!=undefined)
    {
    item.cuisines.forEach(element => {
        cuisinesList = cuisinesList + element + ", ";
    });
    cuisinesList = cuisinesList.substring(0, cuisinesList.length - 2);
}

    if (cuisinesList.length <= 0)
        cuisinesList = 'Uncategoried';

    if (dishTypeList.length <= 0)
        dishTypeList = 'uncategoried';

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 150,
                paddingTop: 20,
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 5,
                flexDirection: 'row',
                borderRadius: 10,
                backgroundColor: 'white'
            }}>
            <Image
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'cover',
                    borderRadius: 10,
                    marginRight: 15
                }}
                source={{
                    uri: item.image
                }} />
            <View style={{
                flex: 1,
                marginRight: 10
            }}>
                <TextTicker
                    duration={15000}
                    loop
                    bounce
                    repeatSpacer={50}
                    marqueeDelay={1000}
                    style={{
                        color: 'black',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>{item.title}</TextTicker>

                <View style={{
                    height: 1,
                    backgroundColor: 'black',
                }} />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 13,
                    }}>Serving: </Text>
                    <Text style={{
                        color: 'green',
                        fontSize: 13,
                    }}>{item.servings}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 13,
                    }}>Price Per Serving: </Text>
                    <Text style={{
                        color: 'green',
                        fontSize: 13,
                    }}>{item.pricePerServing} $</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 13,
                    }}>Dish Type: </Text>
                    <TextTicker
                        duration={15000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={1000}
                        style={{
                            color: 'green',
                            fontSize: 13,
                            marginEnd: 10
                        }}>{dishTypeList}</TextTicker>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 13,
                    }}>Cuisines: </Text>
                    <TextTicker duration={15000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={1000}
                        style={{
                            color: 'green',
                            fontSize: 13,
                            marginEnd: 10
                        }}>{cuisinesList}</TextTicker>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RecipeItem
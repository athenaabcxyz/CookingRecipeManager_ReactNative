import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';

import TextTicker from 'react-native-text-ticker';


function RecipeItem2({ item, onPress }) {

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

    function IngredientItem({ item }) {

        let imageURL = item.image;

        const words = item.name.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        let ingredientName = words.join(" ");

        return (
            <View
                style={{
                    width: 75,
                    minHeight: 85,
                    paddingTop: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingBottom: 5,
                    marginTop: 5,
                    marginStart: 5,
                    flexDirection: 'column',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    alignitems: 'center'
                }}>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'cover',
                        borderRadius: 5,
                        borderColor: 'green',
                        marginTop: 5,
                        marginStart: 5,
                        marginBottom: 5,
                        borderWidth: 2,
                    }}
                    source={{
                        uri: imageURL
                    }} />
                <View>
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

    return (
        <View
            style={{
                maxHeight: 500,
                paddingTop: 20,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 20,
                marginTop: 5,
                flexDirection: 'column',
                borderRadius: 10,
                backgroundColor: 'white'
            }}>
            <TouchableOpacity
                onPress={onPress}
                style={{
                    flexDirection: 'row',
                    paddingTop: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingBottom: 5,
                    borderRadius: 5,
                    backgroundColor: 'rgba(236, 236, 236, 1)'}}>
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
            <ScrollView 
                style={{
                    paddingTop: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingBottom: 5,
                    marginTop: 5,
                }}>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>Base on these ingredients:</Text>
                <FlatList
                    horizontal={true}
                    nestedScrollEnabled={true}
                    data={item.usedIngredients}
                    renderItem={({ item }) => (<IngredientItem item={item} />)}
                    keyExtractor={item => item.id}
                    scrollEnabled={true}
                    style={{
                        maxHeight: 300,
                    }} />
            </ScrollView>
            <ScrollView
                style={{
                    paddingTop: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingBottom: 5,
                    marginTop: 5,
                }}>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>Missing these ingredients:</Text>
                <FlatList
                    horizontal={true}
                    nestedScrollEnabled={true}
                    data={item.missedIngredients}
                    renderItem={({ item }) => (<IngredientItem item={item} />)}
                    keyExtractor={item => item.id}
                    scrollEnabled={true}
                    style={{
                        maxHeight: 300,
                    }} />
            </ScrollView>
        </View>
    )
}

export default RecipeItem2
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import EquipmentItem from '../itemComponents/equipmentitem';
import IngredientItem from '../itemComponents/ingredientitem';


function InstructionItem({ item }) {
    return (
        <View
            style={{
                width: 300,
                paddingTop: 15,
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 15,
                marginTop: 5,
                marginStart: 5,
                flexDirection: 'column',
                borderRadius: 10,
                backgroundColor: 'white',
                alignitems: 'center'
            }}>
            <Text
                style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Step: {item.number}</Text>
            <Text
                style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold'
                }}>Equipment needed:</Text>
            {(item.equipment.length == 0) ?
                (<Text
                    style={{
                        color: 'black',
                        fontSize: 16,
                    }}>None</Text>)
                :
                (<FlatList
                    horizontal
                    nestedScrollEnabled={true}
                    data={item.equipment}
                    renderItem={({ item }) => (<EquipmentItem item={item} />)}
                    keyExtractor={item => item.id}
                    scrollEnabled={true}
                    style={{
                        flex: 0.8,
                    }} />
                )}
            <Text
                style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold'
                }}>Ingredients needed:</Text>
            {(item.ingredients.length == 0) ?
                (<Text
                    style={{
                        color: 'black',
                        fontSize: 16,
                    }}>None</Text>)
                :
                (<FlatList
                    data={item.ingredients}
                    renderItem={({ item }) => (<IngredientItem item={item} />)}
                    keyExtractor={item => item.id}/>
                )}
            <Text
                style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold'
                }}>Do:</Text>
            <Text
                style={{
                    color: 'black',
                    fontSize: 15,
                }}>{item.step}</Text>
        </View>
    )
}

export default InstructionItem
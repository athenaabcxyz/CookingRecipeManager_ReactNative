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
    ScrollView, 
} from 'react-native'
import EquipmentItem from '../itemComponents/equipmentitem';
import IngredientItem from '../itemComponents/ingredientitem';
import IngredientItem3 from './ingredientItem3';


function InstructionItem({ item }) {
    const [isdone, setdone] = useState(false);

    return (
        <View
        nestedScrollEnabled={true}
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
                <View style={{flexDirection: 'row'}}>
            <Text
                style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Step: {item.number}</Text>
                <View style={{flex:1}}/>
                </View>
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
                <ScrollView
                nestedScrollEnabled={true}
                 style={{
                    maxHeight: 300,
                    marginBottom: 10
                }}>
            {(item.ingredients.length == 0) ?
                (<Text
                    style={{
                        color: 'black',
                        fontSize: 16,
                    }}>None</Text>)
                :
                (
                <FlatList
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    data={item.ingredients}
                    renderItem={({ item }) => (<IngredientItem3 item={item} />)}
                    keyExtractor={item => item.id}/>
                )}
                </ScrollView>
                <View>
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
        </View>
    )
}

export default InstructionItem
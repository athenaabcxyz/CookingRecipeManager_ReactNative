import React, { useState, useEffect } from 'react';
import RecipeItem from '../itemComponents/recipeItem';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    View,
    Text,
    TextInput,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    StatusBar,
    RefreshControl,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native'
import Modal from 'react-native-modal';

function AdvanceSearch(){

    const [cuisines, setcuisines] = useState([]);

    const data=[
        {id: 1, name:"African", value: "african"},
        {id: 2, name:"American", value: "american"},
        {id: 3, name:"British", value: "british"},
        {id: 4, name:"Cajun", value: "cajun"},
        {id: 5, name:"Caribbean", value: "caribbean"},
        {id: 6, name:"Chinese", value: "chinese"},
        {id: 7, name:"Chinese", value: "chinese"},
    ]

    return <ScrollView style={{
        backgroundColor: 'orange',
        flexDirection: 'row',
        marginTop: StatusBar.currentHeight
    }}
    nestedScrollEnabled={true}>
        <View style={{
            marginStart: 20,
            justifyContent: 'center',
            marginTop: 10,
        }}>
            <Text style={{
                textAlign: 'left',
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold'
            }}>Advance Search</Text>
        </View>
        <View style={{
            height:5,
           backgroundColor:'white',
            marginTop: 10,
            width: Dimensions.get('window').width
        }}/>
        <View style={{
            flexDirection: 'column',
            marginTop: 10,
            paddingStart: 10,
            marginEnd: 10,
        }}>
            <Text style={{
                textAlign: 'left',
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold'
            }}>Querry: </Text>
            <TextInput 
            placeholder='Input text to search'
            style={{
                borderWidth: 5,
                borderRadius: 10,
                borderColor: 'white',
                paddingStart: 15,
                fontWeight: 'bold',
                fontSize: 15,
                color: 'white',
                marginEnd: 10,
                paddingEnd: 10,
                marginTop: 10,
            }}/>
             <Text style={{
                textAlign: 'left',
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold'
            }}>Cuisines: </Text>
            <TouchableOpacity style={{
                borderWidth: 5,
                borderRadius: 10,
                borderColor: 'white',
                paddingStart: 15,
                fontWeight: 'bold',
                fontSize: 15,
                color: 'white',
                marginEnd: 10,
                paddingEnd: 10,
                marginTop: 10,
            }}>
                <Text>
                    {cuisines.map((item)=>item.name)}
                </Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
}

export default AdvanceSearch
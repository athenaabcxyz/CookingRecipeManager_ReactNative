import React, { useState, useEffect } from 'react';
import IngredientItem from '../itemComponents/ingredientitem';
import RecipeItem from '../itemComponents/recipeItem';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    StatusBar,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Image,
    BackHandler,
    Alert
} from 'react-native'
import * as SQLite from "expo-sqlite";

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Firestore, arrayRemove, getFirestore } from "firebase/firestore";
import app from '../components/firebaseConfig';
import { collection, query, where, getDocs, updateDoc, arrayUnion, doc } from "firebase/firestore";

const apiKey = "12ac99b1218346a48dce60a6266c7a3a"; //"e6f3dc1b857f4ad0b84684bcf2da349d";

const sorry = 'There is no result (Ｔ▽Ｔ).'

function IngredientSelect({ navigation, route }) {
    const currentScreen ="IngredientSelect";
    const [user, setUser] = useState(route.params.currentUser)
    const [loggedin, setloggedin] = useState(false);
    const [id, setid] = useState(route.params.id);
    const [isFetching, setFetching] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [search, setSearch] = useState("");
    const [textInput, setTextInput] = useState("Input text to search")

    const error = 'There is error while loading. \n (Ｔ▽Ｔ)'

    const onRefresh = React.useCallback(() => {
        setTextInput("Input text to search")
    }, []);

    const simpleSearch = () => {
        setFetching(true)
        console.log(search)
        fetch("https://api.spoonacular.com/food/ingredients/search?query=banana&number=2&sort=calories&sortDirection=desc&apiKey=" + apiKey)
            .then(res => res.json())
            .then(json => {
                setSearchResult(json.results)
                console.log(searchResult)
                setFetching(false)
            })
            .catch((error) => {
                console.error(error);
                setFetching(false)
            })
    }

    function toUser() {
        navigation.navigate('User', { currentUser: user })
    }

    return (<SafeAreaView style={{
        backgroundColor: "orange",
        justifyContent: 'flex-start',
        flex: 1,
        marginTop: StatusBar.currentHeight
    }}>
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                <View style={{
                    flexDirection: 'row',
                    width: '90%',
                    borderColor: 'white',
                    borderRadius: 10,
                    borderWidth: 5,
                    alignContent: 'center',
                    marginTop: 10,
                    width: 350
                }}>
                    <TextInput
                        onChangeText={(text) => { setSearch(text) }}
                        onSubmitEditing={simpleSearch}
                        placeholder={textInput}
                        placeholderTextColor={'white'}
                        textAlign='left'
                        fontWeight='bold'
                        color='white'
                        style={{ flex: 1, paddingLeft: 10, paddingRight: 10, }} />
                </View>
            </View>
            <Text style={{
                marginTop: 10,
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 25,
            }}>Ingredients</Text>
            <View style={{
                flex: 0.5,
                marginTop: 10,
                marginStart: 10,
                marginEnd: 10,
                marginBottom: 10,
                width: 300,
                height: 1000,
                borderRadius: 10,
            }}>
                <View style={{
                    flex: 1,
                    marginTop: 20,
                    marginStart: 10,
                    marginEnd: 10,
                    marginBottom: 10,
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                {(isFetching) ? (
                    <FlatList
                    refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onRefresh} />}
                    data={searchResult}
                    renderItem={({ item }) => (<IngredientItem item={item} />)}
                    keyExtractor={item => item.id}
                    scrollEnabled={true}
                    style={{
                        maxHeight: 300,
                    }}/>
                ) : (
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>
                            {sorry}
                        </Text>
                    </View>)}

                </View>
            </View>
        </View>
    </SafeAreaView>);
}

export default IngredientSelect

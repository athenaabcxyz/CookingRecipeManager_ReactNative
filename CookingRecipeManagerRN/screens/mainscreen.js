import React, { useState, useEffect } from 'react';
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
    RefreshControl,
    TouchableOpacity,
    Image,
    BackHandler
} from 'react-native'
import * as SQLite from "expo-sqlite";

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import app from '../components/firebaseConfig';
import { collection, query, where, getDocs, updateDoc,arrayUnion } from "firebase/firestore";

const db = getFirestore(app);

const apiKey = "12ac99b1218346a48dce60a6266c7a3a";
function MainScreen({ navigation, route }) {
    const Stack = createNativeStackNavigator();
    const currentScreen = "Dishes";
    <Stack.Screen name='RecipeItem' component={RecipeItem} />
    const [search, setSearch] = useState("");
    const [recipes, setrecipes] = useState([]);
    const [currentUser, setCurrentUser] = useState(route.params.currentUser)
    const [currentUserData, setCurrentUserData] = useState();
    const [apilink, setapilink] = useState("https://api.spoonacular.com/recipes/random?number=20&apiKey=" + apiKey + "&tags=");
    const [isFetching, setFetching] = useState(false);
    const [dataLength, setDataLength] = useState(1);
    const [searchResult, setSearchResult] = useState([]);
    const [textInput, setTextInput] = useState("Input text to search")

    const onRefresh = React.useCallback(() => {
        fetchData()
        setTextInput("Input text to search")
    }, []);

    const sorry = 'There is no result (Ｔ▽Ｔ).'



    const fetchData = async () => {
        setFetching(true);
        fetch(apilink)
            .then(res => res.json())
            .then(json => {
                setrecipes(json.recipes)
            })
            .catch((error) => {
                console.error(error);
                setFetching(false)
            })
           
    }

    useEffect(async () => {
        const q = query(collection(db, "users"), where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setCurrentUserData(doc.data())
        });
      
    }, []);
    useEffect(() => {
        fetchData()
    }, [apilink]);

    useEffect(() => {
        if (typeof (recipes) == 'undefined')
            setDataLength(1)
        else
            setDataLength(recipes.length)
        setFetching(false)
    }, [recipes]);


    const simpleSearch = () => {
        setFetching(true)
        fetch("https://api.spoonacular.com/recipes/complexSearch?number=20&apiKey=" + apiKey + "&query=" + search)
            .then(res => res.json())
            .then(json => {
                setSearchResult(json.results)
            })
            .catch((error) => {
                console.error(error);
                setFetching(false)
            })
    }

    useEffect(() => {
        setFetching(true)
        getRecipeDetailList()
    }, [searchResult])

    const getRecipeDetailList = () => {
        setrecipes([])
        for (let i = 0; i < searchResult.length; i++) {
            fetch("https://api.spoonacular.com/recipes/" + searchResult[i].id + "/information?apiKey=" + apiKey)
                .then(res => res.json())
                .then(json => {
                    setrecipes(current => [...current, json])
                })
                .catch((error) => {
                    console.error(error);
                    setFetching(false)
                })
        }
    }
    function toUser(){
        navigation.navigate('User', { currentUser: currentUserData })
    }
    async function SaveToHistory(id) {
        console.log(id)
        const q = query(collection(db, "users"), where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await updateDoc(doc, {
                history: arrayUnion(String(id))
            });
            
        });
    }

    function selectRecipe(item) {
        SaveToHistory(item.id)
        navigation.navigate('Detail', { id: item.id, currentUser: currentUserData })
    }
    return <SafeAreaView style={{
        backgroundColor: "orange",
        justifyContent: 'flex-start',
        flex: 1,
        marginTop: StatusBar.currentHeight
    }}>
        <View style={{
            flexDirection: 'row',
            marginTop: 10
        }}>
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                marginStart: 15,
                fontStyle: 'italic',
                //fontFamily: 'Sigmar-Regular'
            }}>DISHES</Text>
            <View style={{ flex: 1 }} />
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                marginStart: 110,
                marginTop: 5,
                //fontFamily: 'Sigmar-Regular'
            }}>{currentUserData ? (currentUserData.username) : "Guest"}</Text>
            <TouchableOpacity 
            onPress={toUser}
            style={{
                height: 35,
                width: 35,
                marginStart: 10,
                marginEnd: 20
            }}>
                <Image source={require('../assets/user.png')}
                    style={{
                        height: 35,
                        width: 35,
                        tintColor: 'white'
                    }} />
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
            <View style={{
                height: 50,
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
                    onChangeText={(text) => { setSearch(text), setTextInput(text) }}
                    onSubmitEditing={simpleSearch}
                    placeholder={textInput}
                    placeholderTextColor={'white'}
                    textAlign='left'
                    fontWeight='bold'
                    color='white'
                    style={{ flex: 1, paddingLeft: 10, paddingRight: 10, }} />
            </View>
        </View>
        <View style={{
            flex: 1,
            marginTop: 20,
            marginStart: 10,
            marginEnd: 10,
            marginBottom: 10,
            alignContent: 'center',
            justifyContent: 'center'
        }}>{(dataLength > 0) ? (<FlatList
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onRefresh} />}
            data={recipes}
            renderItem={({ item }) => (<RecipeItem item={item} onPress={() => selectRecipe(item)} />)}
            keyExtractor={item => item.id}
        />) : (
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                    {sorry}
                </Text>
                <Text onPress={() => setapilink("https://api.spoonacular.com/recipes/random?number=20&apiKey=" + apiKey + "&tags=")} style={{ textAlign: 'center', fontSize: 20, color: 'blue' }}>Reload Page</Text>
            </View>)}

        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        paddingLeft: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default MainScreen
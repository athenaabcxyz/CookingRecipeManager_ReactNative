import React, { useState, useEffect } from 'react';
import RecipeItem2 from '../itemComponents/recipeItem2';
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
    BackHandler,
    Alert,
    LogBox
} from 'react-native'
import * as SQLite from "expo-sqlite";

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Firestore, arrayRemove, getFirestore } from "firebase/firestore";
import app from '../components/firebaseConfig';
import { collection, query, where, getDocs, updateDoc,arrayUnion, doc} from "firebase/firestore";

const db = getFirestore(app);

const apiKey = "12ac99b1218346a48dce60a6266c7a3a";

function SearchResult({ navigation, route }) {
    const Stack = createNativeStackNavigator();
    const currentScreen = "SearchResult";
    <Stack.Screen name='RecipeItem2' component={RecipeItem2} />
    const [recipes, setrecipes] = useState([]);
    const [user, setuser] = useState([]);
    const [currentUser, setCurrentUser] = useState(route.params.currentUser)
    const [apilink, setapilink] = useState(route.params.apilink);
    const [isFetching, setFetching] = useState(false);
    const [dataLength, setDataLength] = useState(1);

    const onRefresh = React.useCallback(() => {
        fetchData()
    }, []);

    const sorry = 'There is no result (Ｔ▽Ｔ).'



    const fetchData = () => {
        setFetching(true);
        fetch(apilink)
            .then(res => res.json())
            .then(json => {
                setrecipes(json)
                setFetching(false)
                console.log(json)
            })
            .catch((error) => {
                console.error(error);
                setFetching(false)
            })
           
    }

    async function updateUser(){
        const q = query(collection(db, "users"), where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setuser(doc.data())
        });
    }


    function handleBackPress(){
        navigation.goBack();
        return true
    }

    useEffect(()=>{
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        updateUser()
        BackHandler.addEventListener("hardwareBackPress",handleBackPress)
        return () =>{
            BackHandler.removeEventListener("hardwareBackPress",handleBackPress)
        }
    },[])

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
    function toUser() {
        navigation.navigate('User', { currentUser: user })
    }
    async function SaveToHistory(id) {
        const docRef = doc(db, "users", user.uid);

        // Atomically add a new region to the "regions" array field.
        await updateDoc(docRef, {
            history: arrayRemove(id)
        });
        await updateDoc(docRef, {
            history: arrayUnion(id)
        });
        updateUser()
    }

    async function selectRecipe(item) {
        await SaveToHistory(item)
        navigation.navigate('Detail', { id: item.id, currentUser: user })
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
            }}>Result</Text>
            <View style={{ flex: 1 }} />
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                marginStart: 110,
                marginTop: 5,
                //fontFamily: 'Sigmar-Regular'
            }}>{user ? (user.username) : "Guest"}</Text>
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
            renderItem={({ item }) => (<RecipeItem2 item={item} onPress={() => selectRecipe(item)} />)}
            keyExtractor={item => item.id}
        />) : (
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                    {sorry}
                </Text>
                <Text onPress={() => setapilink(apilink)} style={{ textAlign: 'center', fontSize: 20, color: 'blue' }}>Reload Page</Text>
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

export default SearchResult
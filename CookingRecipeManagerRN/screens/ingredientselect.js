import React, { useState, useEffect } from 'react';
import IngredientItem3 from '../itemComponents/ingredientItem3';
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

const ingredienta = [
    {
        id: 19400,
        image: "banana-chips.jpg",
        name: "banana chips",
    },
    {
        id: 93671,
        image: "banana-bread.jpg",
        name: "banana bread mix",
    }
];
const db = getFirestore(app);
function IngredientSelect({ navigation, route }) {
    const currentScreen = "IngredientSelect";
    const [user, setuser] = useState(route.params.currentUser)
    const [loggedin, setloggedin] = useState(false);
    const [id, setid] = useState(route.params.id);
    const [isFetching, setFetching] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [search, setSearch] = useState("");
    const [textInput, setTextInput] = useState("Input ingredient name to search")
    const [ingredientlist, setIngredientlist] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const error = 'There is error while loading. \n (Ｔ▽Ｔ)'

    const onRefresh = React.useCallback(() => {
        let array = ingredientlist
        array = []
        setIngredientlist(array);
        setTextInput("Input ingredient name to search")
        setRefresh(false);
    }, []);

    const SeeResult = () => {
        if (ingredientlist.length > 0)
        {
            let array = "https://api.spoonacular.com/recipes/findByIngredients?ranking=1&ingredients=";
            ingredientlist.forEach(element => {
                let str = element.image
                array = array + str.substr(0, str.length - 4) + ',+'
            });
            //array = array - ',+'
            array = array + "&number=5&apiKey=" + apiKey
            navigation.navigate('SearchResult', { apilink: array, currentUser: user })
        }
    }
    async function updateUser(){
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
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
        updateUser()
        BackHandler.addEventListener("hardwareBackPress",handleBackPress)
        return () =>{
            BackHandler.removeEventListener("hardwareBackPress",handleBackPress)
        }
    },[])

    const simpleSearch = () => {
        setFetching(true)
        console.log('searching: ' + search)
        fetch("https://api.spoonacular.com/food/ingredients/search?query=" + search + "&number=10&apiKey=" + apiKey)
            .then(res => res.json())
            .then(json => {
                console.log(json.results)
                setSearchResult(json.results)
                setFetching(false)
            })
            .catch((error) => {
                console.error(error);
                setFetching(false)
            })
    }

    const Add = (thisitem) => {
        if (!ingredientlist.includes(thisitem)) {
            let array = ingredientlist;
            array.push(thisitem);
            setIngredientlist(array);
        }
        console.log('added' + thisitem.name)
        setRefresh(!refresh);
    }

    const Remove = (thisitem) => {
        if (ingredientlist.includes(thisitem)) {
            let array = ingredientlist.filter(item => item.id !== thisitem.id);
            setIngredientlist(array);
        }
        console.log('removed' + thisitem.name)
        setRefresh(!refresh);
    }

    const Clear = () => {
        let array = [];
        setIngredientlist(array);
        console.log('clear')
    }

    function toUser() {
        navigation.navigate('User', { currentUser: user })
    }

    function Ingredient({ item }) {

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
                <TouchableOpacity
                    onPress={() => Add(item)}
                    style={{
                        height: 35,
                        width: 35,
                        marginStart: 10,
                        marginEnd: 20
                    }}>
                    <Text
                        style={{
                            color: 'green',
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>Add</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function Ingredient2({ item }) {

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
                <TouchableOpacity
                    onPress={() => Remove(item)}
                    style={{
                        height: 35,
                        width: 35,
                        marginStart: 10,
                        marginEnd: 20
                    }}>
                    <Text
                        style={{
                            color: 'red',
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>Remove</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (<SafeAreaView style={{
        backgroundColor: "orange",
        justifyContent: 'flex-start',
        flex: 1,
        marginTop: StatusBar.currentHeight
    }}>
        <View style={{
            flexDirection: 'row',
            marginTop: 10,
        }}>

            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                marginStart: 15,
                fontStyle: 'italic',
                //fontFamily: 'Sigmar-Regular'
            }}>Recipe Search</Text>
            <View style={{ flex: 1 }} />
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                marginStart: 60,
                marginTop: 5,
                //fontFamily: 'Sigmar-Regular'
            }}>{user.username}</Text>
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
                height: 5,
                backgroundColor: 'white',
                marginBottom: 5
            }}></View>
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
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Text style={{
                         marginTop: 20,
                         borderWidth: 3,
                         borderColor: 'white',
                         width:380,
                         borderRadius:5,
                         backgroundColor:'white',
                         textAlign: 'center',
                         color: 'orange',
                         fontWeight: 'bold',
                         fontSize: 25,
                    }}>Results</Text>
                    <View style={{
                        flex: 1,
                        marginTop: 10,
                        marginStart: 10,
                        marginEnd: 10,
                        marginBottom: 10,
                        borderWidth: 4,
                        borderColor: 'white',
                        borderRadius: 5,
                        width: 380,
                        padding: 10,
                        alignContent: 'center',
                        justifyContent: 'center',
                        height: 200,
                        maxHeight: 200
                    }}>

                        {searchResult.length<=0? (<Text style={{
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 25,
                        }}>
                            Please input ingredient name about to filter ingredients list.
                        </Text>) : (
                            <FlatList
                                scrollsToTop={true}
                                scrollEnabled={true}
                                nestedScrollEnabled={true}
                                data={searchResult}
                                renderItem={({ item }) => (<Ingredient item={item} />)}
                                keyExtractor={item => item.id} />)}
                    </View>
                    <Text style={{
                         marginTop: 20,
                         borderWidth: 3,
                         borderColor: 'white',
                         width:380,
                         borderRadius:5,
                         backgroundColor:'white',
                         textAlign: 'center',
                         color: 'orange',
                         fontWeight: 'bold',
                         fontSize: 25,
                    }}>Included</Text>
                    <View style={{
                        flex: 1,
                        marginTop: 10,
                        marginStart: 10,
                        marginEnd: 10,
                        marginBottom: 10,
                        borderWidth: 4,
                        borderColor: 'white',
                        borderRadius: 5,
                        width: 380,
                        padding: 10,
                        alignContent: 'center',
                        justifyContent: 'center',
                        height: 200,
                        maxHeight: 200
                    }}>
                        {ingredientlist.length<=0 ? (<Text style={{
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 25,
                        }}>
                            You haven't selected any ingredient yet.
                        </Text>) : (
                            <FlatList
                                scrollEnabled={true}
                                nestedScrollEnabled={true}
                                data={ingredientlist}
                                extraData={refresh}
                                renderItem={({ item }) => (<Ingredient2 item={item} />)}
                                keyExtractor={item => item.id} />)}
                    </View>
                    <TouchableOpacity
                        onPress={SeeResult}
                        style={{
                            borderWidth: 5,
                            borderColor: 'white',
                            borderRadius: 10,
                            backgroundColor: 'orange',
                            width: 300,
                            justifyContent: 'center',
                            marginTop: 10,
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>Search with selected ingredients.</Text>
                    </TouchableOpacity>
                </View>
            </View>
    </SafeAreaView>);
}

export default IngredientSelect

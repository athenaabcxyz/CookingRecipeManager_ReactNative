import React, { useState, useEffect } from 'react';
import IngredientItem from '../itemComponents/ingredientitem';
import RecipeItem from '../itemComponents/recipeItem';
import SimilarItem from '../itemComponents/similaritem';
import Modal from 'react-native-modal';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
    View,
    Text,
    RefreshControl,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    BackHandler, Dimensions,
    TextView
} from 'react-native'

import { useRoute } from '@react-navigation/native';
import { Firestore, arrayRemove, getFirestore } from "firebase/firestore";
import app from '../components/firebaseConfig';
import { collection, query, where, getDocs, updateDoc,arrayUnion, doc, getDoc} from "firebase/firestore";

const db = getFirestore(app);

const apiKey = "e6f3dc1b857f4ad0b84684bcf2da349d"; //"12ac99b1218346a48dce60a6266c7a3a";


function User({ navigation, route }) {
    const currentScreen = "User";
    const [user, setUser] = useState(route.params.currentUser)
    const [historyData, setHistoryData] = useState([]);
    const [libraryData, setLibraryData] = useState([]);
    const [isChangePasswordShowed, setChangePasswordShowing] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [history, setHistory] = useState([]);
    const [library, setLibrary] = useState([]);


    const toggleChangePassword = () => {
        setNutritionChartState(!isNutritionCharShowed);
    };

    useEffect(()=>{
        setHistory(user.history)
        setLibrary(user.library)
    },[user])

    async function SaveToHistory(id) {
        const docRef = doc(db, "users", user.uid);

        // Atomically add a new region to the "regions" array field.
        await updateDoc(docRef, {
            history: arrayRemove(id)
        });
        await updateDoc(docRef, {
            history: arrayUnion(id)
        });
    }
    function selectRecipe(item) {
        SaveToHistory(item)
        navigation.navigate('Detail', { id: item.id, currentUser: user })
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
            }}>User</Text>
            <View style={{ flex: 1 }} />
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                marginStart: 110,
                marginTop: 5,
                marginEnd: 10
                //fontFamily: 'Sigmar-Regular'
            }}>{user.username}</Text>
        </View>
        <View style={{
            height: 5,
            backgroundColor: 'white',
            marginBottom: 5
        }}></View>
        {isFetching ? (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color="white" style={{
                    alignSelf: 'center',
                    marginTop: 150
                }} />
            </View>
        ) : (
            <ScrollView
                nestedScrollEnabled={true}
                style={{
                    flexDirection: 'column'
                }}>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Text style={{
                        marginTop: 10,
                        borderWidth: 3,
                        borderColor: 'white',
                        width:380,
                        borderRadius:5,
                        backgroundColor:'white',
                        textAlign: 'center',
                        color: 'orange',
                        fontWeight: 'bold',
                        fontSize: 25,
                    }}>Library</Text>
                    <View style={{
                        flex: 1,
                        marginTop: 10,
                        marginStart: 10,
                        marginEnd: 10,
                        marginBottom: 10,
                        borderWidth:4,
                        borderColor:'white',
                        borderRadius:5,
                        width:380,
                        padding:10,
                        alignContent: 'center',
                        justifyContent: 'center',
                        height: 500
                    }}>
                        <FlatList
                            nestedScrollEnabled={true}
                            data={library}
                            renderItem={({ item }) => (<RecipeItem item={item} onPress={() => selectRecipe(item)} />)}
                            keyExtractor={item => item.id}
                        />

                    </View>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: 10,
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
                    }}>Recently Viewed</Text>
                    <View>
                        <FlatList
                            nestedScrollEnabled={true}
                            horizontal={true}
                            data={history}
                            renderItem={({ item }) => (<SimilarItem item={item} onPress={() => selectRecipe(item)} />)}
                            keyExtractor={item => item.id}
                        />

                    </View>
                </View>

            </ScrollView>
        )}
    </SafeAreaView>);
}

export default User

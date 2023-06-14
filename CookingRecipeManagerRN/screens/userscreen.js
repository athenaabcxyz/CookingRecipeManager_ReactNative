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
import * as SQLite from "expo-sqlite";
import { useRoute } from '@react-navigation/native';

const apiKey = "12ac99b1218346a48dce60a6266c7a3a"//"e6f3dc1b857f4ad0b84684bcf2da349d"; //;


function User({ navigation, route }) {
    const currentScreen = "User";
    const [currentUser, setCurrentUser] = useState(route.params.currentUser)
    const [db, setDb] = useState(SQLite.openDatabase('example.db'));
    const [historyData, setHistoryData] = useState([]);
    const [libraryData, setLibraryData] = useState([]);
    const [isChangePasswordShowed, setChangePasswordShowing] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [history, setHistory] = useState([]);
    const [library, setLibrary] = useState([]);


    const onRefresh = React.useCallback(() => {
        fetchData()
    }, []);

    const toggleChangePassword = () => {
        setNutritionChartState(!isNutritionCharShowed);
    };
    const fetchData = () => {
        getHistory();
        getLibrary();
    }

    useEffect(() => {
        fetchData()
    }, [libraryData])

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM history', [], (_, { rows }) =>
                setHistoryData(rows._array)
            );

        });
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM library', [], (_, { rows }) =>
                setLibraryData(rows._array)
            );
            setFetching(false);
        });
    }, []);

    const getLibrary = () => {
        if (typeof (libraryData) != "undefined") {
            for (let library of libraryData) {
                if (library.username == currentUser) {
                    fetch("https://api.spoonacular.com/recipes/" + library.recipeId + "/information?apiKey=" + apiKey)
                        .then(res => res.json())
                        .then(json => {
                            setLibrary(current => [...current, json])
                        })
                        .catch((error) => {
                            console.error(error);
                            setFetching(false)
                        })
                }

            }
        }

    }

    function SaveToHistory(id) {
        db.transaction(tx => {
            tx.executeSql('If Not Exists(select * from history where recipeId=? and username = ?) Begin insert into history (username, recipeId) values (?,?) End', [id, route.params.currentUser, route.params.currentUser, id]);
        });
    }

    function selectRecipe(item) {
        SaveToHistory(item.id)
        navigation.navigate('Detail', { id: item.id, currentUser: route.params.currentUser })
    }

    const getHistory = () => {
        if (typeof (historyData) != "undefined") {
            for (let history of historyData) {
                if (history.username == currentUser) {
                    fetch("https://api.spoonacular.com/recipes/" + history.recipeId + "/information?apiKey=" + apiKey)
                        .then(res => res.json())
                        .then(json => {
                            setLibrary(current => [...current, json])
                        })
                        .catch((error) => {
                            console.error(error);
                            setFetching(false)
                        })
                }

            }
        }
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
            }}>{route.params.currentUser}</Text>
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
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 25,
                    }}>Library</Text>
                    <View style={{
                        flex: 1,
                        marginTop: 20,
                        marginStart: 10,
                        marginEnd: 10,
                        marginBottom: 10,
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
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 25,
                        marginBottom: 10,
                    }}>Recently Viewed</Text>
                    <View>
                        <FlatList
                            nestedScrollEnabled={true}
                            horizontal={true}
                            data={history}
                            renderItem={({ item }) => (<SimilarItem item={item} onPress={() => setid(item.id)} />)}
                            keyExtractor={item => item.id}
                        />

                    </View>
                </View>

            </ScrollView>
        )}
    </SafeAreaView>);
}

export default User

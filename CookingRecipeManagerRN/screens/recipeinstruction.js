import React, { useState, useEffect } from 'react';
import IngredientItem2 from '../itemComponents/ingredientitem2';
import EquipmentItem from '../itemComponents/equipmentitem';
import InstructionItem from '../itemComponents/instuctionItem';
import Modal from 'react-native-modal';
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

import { useRoute } from '@react-navigation/native';

const apiKey = "12ac99b1218346a48dce60a6266c7a3a"; //"12ac99b1218346a48dce60a6266c7a3a";

function RecipeInstruction({ navigation, route }) {
    const [currentUser, setCurrentUser] = useState();
    const [loggedin, setloggedin] = useState(false);
    const [id, setid] = useState(route.params.id);
    const [apilink, setapilink] = useState("https://api.spoonacular.com/recipes/" + id + "/information?includeNutrition=true&apiKey=" + apiKey);
    const [isFetching, setFetching] = useState(false);
    const [recipe, setrecipe] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [isGetingInstruction, setGettingInstruction] = useState(false)

    const error = 'There is error while loading. \n (Ｔ▽Ｔ)'

    const fetchData = () => {
        setFetching(true);
        fetch(apilink)
            .then(res => res.json())
            .then(json => {
                setrecipe(json)
                setFetching(false)
  
            })
            .catch((error) => {
                console.error(error);
                setFetching(false)
            })
    }

    useEffect(() => {
        if (route && route.params) {
            setCurrentUser(route.params.currentUser)
            setloggedin(true);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (route && route.params) {
            setCurrentUser(route.params.currentUser)
            setloggedin(true);
        }
        setapilink("https://api.spoonacular.com/recipes/" + id + "/information?includeNutrition=true&apiKey=" + apiKey)
        fetchData();
    }, [id]);
    useEffect(()=>{
        if (route && route.params) {
            setCurrentUser(route.params.currentUser)
            setloggedin(true);
        }
        getInstruction(recipe.id)
    },[recipe])

    const getInstruction = (id) => {
        setGettingInstruction(true)
        fetch("https://api.spoonacular.com/recipes/" + id + "/analyzedInstructions?&apiKey=" + apiKey)
            .then(res => res.json())
            .then(json => {
                setInstructions(json)
                console.log(instructions)
                setGettingInstruction(false)
            })
            .catch((error) => {
                console.error(error);
                setGettingInstruction(false)
            })
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
            {
                loggedin ? (
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'white',
                        marginStart: 15,
                        fontStyle: 'italic',
                        //fontFamily: 'Sigmar-Regular'
                    }}>{ currentUser }</Text>
                ) :
                (
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'white',
                        marginStart: 15,
                        fontStyle: 'italic',
                        //fontFamily: 'Sigmar-Regular'
                    }}>Instruction</Text>
                )
            }

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
                    flex: 0.1,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 25
                    }}>
                        {recipe.title}
                    </Text>
                </View>
                <View style={{
                    flex: 0.35,
                    alignItems: 'center',
                    marginBottom: 10
                }}>
                    <Image style={{
                        width: 240,
                        height: 240,
                        resizeMode: 'cover',
                        borderRadius: 10,
                    }}
                        source={{
                            uri: recipe.image
                        }} />

                </View>
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
                    }}>Ingredients</Text>
                    <View style={{
                        flex: 0.8,
                        marginTop: 10,
                        marginStart: 10,
                        marginEnd: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        maxHeight: 200,
                    }}>
                        {(!isFetching) ? (<FlatList
                            horizontal
                            nestedScrollEnabled={true}
                            data={recipe.extendedIngredients}
                            renderItem={({ item }) => (<IngredientItem2 item={item} />)}
                            keyExtractor={item => item.id}
                            scrollEnabled={true}
                            style={{
                                flex: 0.8,
                            }}

                        />) : (<Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 20 }}>
                            {error}
                        </Text>
                        )}
                    </View>
                    <View style={{
                        flex: 0.8,
                        marginTop: 10,
                        marginStart: 10,
                        marginEnd: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                    }}>
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
                            <FlatList
                                data={instructions}
                                nestedScrollEnabled={true}
                                renderItem={({ item }) => (
                                    <View>
                                        {(item.name == "") ?
                                            (<Text style={{
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                                color: 'white',
                                                marginStart: 15,
                                                fontStyle: 'italic',
                                                //fontFamily: 'Sigmar-Regular'
                                            }}>Main Instruction</Text>)
                                            :
                                            (<Text style={{
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                                color: 'white',
                                                marginStart: 15,
                                                fontStyle: 'italic',
                                                //fontFamily: 'Sigmar-Regular'
                                            }}>Ingredient Instruction: {item.name}</Text>
                                            )}
                                        <FlatList
                                            nestedScrollEnabled={true}
                                            data={item.steps}
                                            renderItem={({ item }) => (<InstructionItem item={item} />)}
                                            keyExtractor={item => item.number}
                                            scrollEnabled={true}
                                            style={{
                                                flex: 0.8,
                                            }} />
                                    </View>
                                )}
                                keyExtractor={(item, index) => index}
                            />)}
                    </View>
                </View>
            </ScrollView>
        )}
    </SafeAreaView>);
}

export default RecipeInstruction

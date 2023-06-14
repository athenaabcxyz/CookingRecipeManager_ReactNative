import React, { useState, useEffect } from 'react';
import IngredientItem from '../itemComponents/ingredientitem';
import RecipeItem from '../itemComponents/recipeItem';
import SimilarItem from '../itemComponents/similaritem';
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
    ScrollView,
    BackHandler
} from 'react-native'

import { useRoute } from '@react-navigation/native';

const apiKey = "12ac99b1218346a48dce60a6266c7a3a"//"e6f3dc1b857f4ad0b84684bcf2da349d"; //;

function RecipeDetail({navigation, route}) {
    const currentScreen="Detail";
    const [id, setid] = useState(route.params.id);
    const [apilink, setapilink] = useState("https://api.spoonacular.com/recipes/"+id+"/information?includeNutrition=true&apiKey=" + apiKey);
    const [isFetching, setFetching] = useState(false);
    const [isNutritionCharShowed, setNutritionChartState] = useState(false);
    const [similarRecipe, setsimilarRecipe] = useState([]);
    const [recipe, setrecipe] = useState([]);
    const [isFetching2, setFetching2] = useState(false);

    let similarAPI= 'https://api.spoonacular.com/recipes/' + recipe.id + '/similar?apiKey=' + apiKey;

    const error = 'There is error while loading. \n (Ｔ▽Ｔ)'
    

    const fetchData = () => {
        setFetching(true);
        setFetching2(true)
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

    const getRecipeSumary = (summary) =>{
        if(typeof(summary)!='undefined'){
        let result = summary.replaceAll("<b>","");
        result = result.replaceAll("</b>","");
        result = result.replaceAll("<a href=","");
        result = result.replaceAll("</a>","");
        result = result.replaceAll(">", " - ")
        return result
        }
    }

    const toggleNutritionChart = () => {
        setNutritionChartState(!isNutritionCharShowed);
    };

    useEffect(()=>{
        fetchData()
    }, [apilink])
    useEffect(()=>{
        setapilink("https://api.spoonacular.com/recipes/"+id+"/information?includeNutrition=true&apiKey=" + apiKey)
    },[id])

    useEffect(()=>{
        fetch(similarAPI)
        .then(res => res.json())
        .then(json2 => {
            setsimilarRecipe(json2)
            setFetching2(false);
        })
        .catch((error) => {

            setFetching2(false)
        })

    }, [recipe]);

    function viewInstruction(id) {
        navigation.navigate('Instruction', { id: id, currentUser: route.params.currentUser.username })
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
            }}>DETAIL</Text>
        <View style={{flex:1}}/>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                marginStart: 110,
                marginTop: 5,
                //fontFamily: 'Sigmar-Regular'
            }}>{route.params.currentUser.username}</Text>
            <TouchableOpacity style={{
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
                }}/>
            </TouchableOpacity>
        </View>
        <View style={{
            height: 5,
            backgroundColor: 'white',
            marginBottom: 5
        }}></View>

        <Modal isVisible={isNutritionCharShowed}>
            <TouchableOpacity
                onPress={toggleNutritionChart}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Image
                    style={{
                        width: 250,
                        height: 500,
                        resizeMode: 'stretch',
                    }}
                    source={{
                        uri: 'https://api.spoonacular.com/recipes/'+recipe.id+'/nutritionLabel.png/?apiKey='+apiKey
                    }} />
            </TouchableOpacity>
        </Modal>

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
                    flex: 0.08,
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        onPress={toggleNutritionChart}
                        style={{
                            borderWidth: 5,
                            borderColor: 'white',
                            borderRadius: 10,
                            backgroundColor: 'orange',
                            height: 50,
                            width: 200,
                            justifyContent: 'center',
                            marginTop: 10,
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 15,
                            fontWeight: 'bold',
                            borderRadius: 10,
                            color: 'white'
                        }}>
                            See Nutrition Chart</Text>
                    </TouchableOpacity>
                </View>
                <Text style={
                    {
                        color: 'white',
                        fontSize: 15,
                        padding: 10,
                        textAlign: 'left'
                    }
                }>
                    {getRecipeSumary(recipe.summary)}
                </Text>
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
                        flex: 0.5,
                        marginTop: 10,
                        marginStart: 10,
                        marginEnd: 10,
                        marginBottom: 10,
                        width: 300,
                        borderRadius: 10,
                    }}>
                    <FlatList
                            nestedScrollEnabled={true}
                            data={recipe.extendedIngredients}
                            renderItem={({ item }) => (<IngredientItem item={item} />)}
                            keyExtractor={item => item.id}
                            scrollEnabled={true}
                            style={{
                                maxHeight: 300,
                            }}

                        />

                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginBottom: 20
                }}>
                    <TouchableOpacity
                        onPress={() => viewInstruction(recipe.id)}
                        style={{
                            borderWidth: 5,
                            borderColor: 'white',
                            borderRadius: 10,
                            backgroundColor: 'orange',
                            height: 50,
                            width: 200,
                            justifyContent: 'center',
                            marginTop: 10,
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 15,
                            fontWeight: 'bold',
                            borderRadius: 10,
                            color: 'white'
                        }}>
                            View Instructions</Text>
                    </TouchableOpacity>
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
                    }}>Similar Recipes</Text>
                    <View>
                        <FlatList
                            nestedScrollEnabled={true}
                            horizontal={true}
                            data={similarRecipe}
                            renderItem={({ item }) => (<SimilarItem item={item} onPress={()=>setid(item.id)}/>)}
                            keyExtractor={item => item.id}
                        /> 

                    </View>
                </View>

            </ScrollView>
        )}
    </SafeAreaView>);
}

export default RecipeDetail

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
    ScrollView
} from 'react-native'

import { useRoute } from '@react-navigation/native';

const apiKey = "e6f3dc1b857f4ad0b84684bcf2da349d"; //"12ac99b1218346a48dce60a6266c7a3a";

function RecipeDetail({navigation, route}) {
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

    const toggleNutritionChart = () => {
        setNutritionChartState(!isNutritionCharShowed);
    };

    useEffect(() => {
        fetchData();
    }, []);

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
            console.log('data: ' +json2)
        })
        .catch((error) => {

            setFetching2(false)
        })
    }, [recipe]);

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
                        uri: 'https://api.spoonacular.com/food/menuItems/'+recipe.id+'/nutritionLabel.png/?apiKey='+apiKey
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
                    {recipe.summary}
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
                        {(!isFetching) ? (<FlatList
                            nestedScrollEnabled={true}
                            data={recipe.extendedIngredients}
                            renderItem={({ item }) => (<IngredientItem item={item} />)}
                            keyExtractor={item => item.id}
                            scrollEnabled={true}
                            style={{
                                maxHeight: 300,
                            }}

                        />) : (<Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 20 }}>
                            {error}
                        </Text>
                        )}

                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginBottom: 20
                }}>
                    <TouchableOpacity
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
                        {(!isFetching2) ? (<FlatList
                            nestedScrollEnabled={true}
                            horizontal={true}
                            data={similarRecipe}
                            renderItem={({ item }) => (<SimilarItem item={item} onPress={()=>setid(item.id)}/>)}
                            keyExtractor={item => item.id}
                        />) : (<Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 20 }}>
                            {error}
                        </Text>
                        )}

                    </View>
                </View>

            </ScrollView>
        )}
    </SafeAreaView>);
}

export default RecipeDetail

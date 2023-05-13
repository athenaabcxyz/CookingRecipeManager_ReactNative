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
    TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal';

const apiKey = "e6f3dc1b857f4ad0b84684bcf2da349d";

function MainScreen({ navigation }) {

    const Stack = createNativeStackNavigator();
    <Stack.Screen name='RecipeItem' component={RecipeItem} />
    const [search, setSearch] = useState("");
    const [recipes, setrecipes] = useState([]);
    const [apilink, setapilink] = useState("https://api.spoonacular.com/recipes/random?number=20&apiKey=" + apiKey + "&tags=");
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
                setrecipes(json.recipes)
                setFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setFetching(false)
            })
    }

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        fetchData()
    }, [apilink]);

    useEffect(() => {
        if (typeof (recipes) == 'undefined')
            setDataLength(1)
        else
            setDataLength(recipes.length)
    }, [recipes]);


    const simpleSearch = () => {
        setFetching(true)
        const tags = search.split(' ').join(",").toLowerCase();
        setapilink("https://api.spoonacular.com/recipes/random?number=20&apiKey=" + apiKey + "&tags=".concat(tags))
    }

    function selectRecipe(item) {
        navigation.navigate('Detail', { id: item.id })
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
            <View style={{ flex: 0.3 }} />
           
            <View style={{ flex: 0.05 }} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
        <View style={{
                height: 50,
                flexDirection: 'row',
                width: '90%',
                borderColor: 'white',
                borderRadius: 10,
                borderWidth: 3,
                alignContent: 'center', 
                marginTop: 10,
                width: 350
            }}>
                <TextInput
                    onChangeText={(text) => { setSearch(text) }}
                    onSubmitEditing={simpleSearch}
                    placeholder='Search by tags, ingredients,...'
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
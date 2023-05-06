import React, { useState, useEffect } from 'react';
import RecipeItem from '../itemComponents/recipeItem';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    StatusBar,
    RefreshControl
} from 'react-native'

const apiKey = "12ac99b1218346a48dce60a6266c7a3a";

function MainScreen(props) {

    const [search, setSearch] = useState("");
    const [recipes, setrecipes] = useState([]);
    const [apilink, setapilink] = useState("https://api.spoonacular.com/recipes/random?number=20&apiKey=12ac99b1218346a48dce60a6266c7a3a&tags=");
    const [isFetching, setFetching] = useState(false);
    const [isResulted, setResult] = useState(true);

    const onRefresh = React.useCallback(() => {
      fetchData()
    }, []);

    const sorry='There is no result. \n (Ｔ▽Ｔ)'

    const fetchData = () => {
        setFetching(true);
        fetch(apilink)
            .then(res => res.json())
            .then(json => {
                setrecipes(json.recipes)
                setFetching(false);
                console.log(json)
            })
            .catch((error) => {
                console.error(error);
                setFetching(false)
            })
            if(recipes.length<=0)
            setResult(false)
            else
            setResult(true)
    }

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        fetchData()
    },[apilink]);

    const simpleSearch = () => {
        setFetching(true)
        const tags = search.split(' ').join(",").toLowerCase();
        setapilink("https://api.spoonacular.com/recipes/random?number=20&apiKey=12ac99b1218346a48dce60a6266c7a3a&tags=".concat(tags))
    }

    const data = [
        { key: '1', value: 'Main course' },
        { key: '2', value: 'Side dish' },
        { key: '3', value: 'Dessert' },
        { key: '4', value: 'Appetizer' },
        { key: '5', value: 'Salad' },
        { key: '6', value: 'Bread' },
        { key: '7', value: 'Breakfast' },
        { key: '8', value: 'Soup' },
        { key: '9', value: 'Beverage' },
        { key: '10', value: 'Sauce' },
        { key: '11', value: 'Marinade' },
        { key: '12', value: 'Fingerfood' },
        { key: '13', value: 'Snack' },
        { key: '14', value: 'Drink' },
    ]

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
            <View style={{
                flex: 1,
                flexDirection: 'row',
                width: '90%',
                borderColor: 'gray',
                borderRadius: 10,
                borderWidth: 2,
                alignContent: 'center'
            }}>
                <TextInput
                    onChangeText={ (text) => {setSearch(text)}}                    
                    onSubmitEditing={simpleSearch}
                    placeholder='Search by tags, ingredients,...'
                    placeholderTextColor={'white'}
                    textAlign='left'
                    fontWeight='bold'
                    color='white'
                    style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }} />
            </View>
            <View style={{ flex: 0.05 }} />
        </View>

        <View style={{
            flex: 1,
            marginTop: 20,
            marginStart: 10,
            marginEnd: 10,
            marginBottom: 10,
            alignContent: 'center',
            justifyContent: 'center'
        }}>
            {isResulted ? (<Text style={{textAlign:'center', alignSelf: 'center', fontSize: 20}}>
                {sorry}
                </Text>):(
            <FlatList
                    refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onRefresh} />}
                    data={recipes}
                    renderItem={({ item }) => (<RecipeItem item={item} />)}
                    keyExtractor={item => item.id}
                />
            )}
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
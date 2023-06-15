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
    ScrollView,
    TextInput,
    TouchableHighlight,
    Dimensions,
    Alert, BackHandler
} from 'react-native'
import * as SQLite from "expo-sqlite";
import { useRoute } from '@react-navigation/native';
import app from '../components/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);


const apiKey = "12ac99b1218346a48dce60a6266c7a3a"; //"12ac99b1218346a48dce60a6266c7a3a";

function LoginScreen({ navigation, route }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const error = 'There is error while loading. \n (Ｔ▽Ｔ)'

    function handleBackPress(){
        Alert.alert(
            'Exit App',
            'Exit the application?',
            [
                {
                    text: 'Cancel',
                    onPress: () =>{
                        console.log('Cancel Pressed')
                    },
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => BackHandler.exitApp(),
                },
            ],
            {
                cancelable: false,
            },
        );
        return true;
    }


    useEffect(()=>{
        BackHandler.addEventListener("hardwareBackPress",handleBackPress)
        return() =>{
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
        }
    },[])

    toRegister = () => {
        navigation.navigate('Register')
    }

    toResetPassword = () =>{
        navigation.navigate('Reset')
    }
    loginCheck = () => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                Alert.alert('', "Login succeeded.")
                navigation.navigate('Dishes', { currentUser: user })
                setIsLoading(false)
                // ...
            })
            .catch((error) => {
                setIsLoading(false)
                Alert.alert('', "Login failed")
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });

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
            }}>Login</Text>
        </View>
        <View style={{
            height: 5,
            backgroundColor: 'white',
            width: Dimensions.get('window').width,
            marginTop: 10,
        }} />
        <View>
            {isLoading ? (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View style={{
                    marginTop: 100,
                    marginStart: 30,
                    marginEnd: 50
                }}>
                    <Text style={{
                        fontWeight: '800',
                        fontSize: 20,
                        marginStart: 10,
                        color: 'white'
                    }}>
                        Email:
                    </Text>

                    <TextInput
                        placeholderTextColor={'white'}
                        placeholder='Type in your email'
                        style={{
                            marginTop: 0,
                            color: 'white',
                            marginEnd: 10,
                            borderBottomWidth: 2,
                            borderBottomColor: 'white',
                            marginStart: 10,
                            minWidth: 300,
                        }}
                        
                        onChangeText={(text) => setEmail(text)}
                        value={email}   >
                    </TextInput>

                    <Text style={{
                        fontWeight: '800',
                        fontSize: 20,
                        marginStart: 10,
                        color: 'white',
                        marginTop: 10
                    }}>
                        Password:
                    </Text>

                    <TextInput
                        placeholder='Type in your password'
                        placeholderTextColor={'white'}
                        secureTextEntry={true}
                        style={{
                            color: 'white',
                            marginTop: 0,
                            marginEnd: 10,
                            borderBottomWidth: 2,
                            borderBottomColor: 'white',
                            marginStart: 10,
                            minWidth: 300,
                        }}
                        onChangeText={(text) => setPassword(text)}
                        value={password}>
                    </TextInput>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                    <TouchableHighlight style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderWidth: 5,
                        borderColor: 'white',
                        width: 100,
                        height: 40,
                        marginStart: 20,
                        marginTop: 50,
                        borderRadius: 8,
                    }}
                        onPress={loginCheck} >
                        <Text style={{
                            alignSelf: 'center',
                            color: 'white',
                            fontSize: 15,

                            fontWeight: '500'
                        }}>
                            LOGIN
                        </Text>
                    </TouchableHighlight>

                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        marginTop: 60,
                        fontSize: 15,
                        marginStart: 30,
                        fontWeight: 'bold'
                    }}>Or</Text>

                    <TouchableHighlight style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderWidth: 5,
                        borderColor: 'white',
                        width: 100,
                        height: 40,
                        marginStart: 30,
                        marginTop: 50,
                        borderRadius: 8,
                    }}
                        onPress={toRegister} >
                        <Text style={{
                            alignSelf: 'center',
                            color: 'white',
                            fontSize: 15,
                            fontWeight: '500'
                        }}>
                            Register
                        </Text>
                    </TouchableHighlight>
                    </View>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        marginTop: 20,
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>Forget Password?</Text>

                    <TouchableHighlight style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderWidth: 5,
                        borderColor: 'white',
                        width: 200,
                        height: 40,
                        marginTop: 10,
                        borderRadius: 8,
                    }}
                        onPress={toResetPassword} >
                        <Text style={{
                            alignSelf: 'center',
                            color: 'white',
                            fontSize: 15,
                            fontWeight: '500'
                        }}>
                            Reset password
                        </Text>
                    </TouchableHighlight>

                </View>
            )
            }
        </View>
    </SafeAreaView>);
}

export default LoginScreen

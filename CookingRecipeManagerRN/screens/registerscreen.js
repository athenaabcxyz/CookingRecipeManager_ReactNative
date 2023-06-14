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
    Alert
} from 'react-native'
import * as SQLite from "expo-sqlite";
import { useRoute } from '@react-navigation/native';

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import app from '../components/firebaseConfig';
const auth = getAuth(app);
const db = getFirestore(app);

const apiKey = "12ac99b1218346a48dce60a6266c7a3a"; //"12ac99b1218346a48dce60a6266c7a3a";

function RegisterScreen({ navigation, route }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassm, setRePass] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const error = 'There is error while loading. \n (Ｔ▽Ｔ)'
    registerCheck = () => {
        if (email == "" || password == "" || rePassm == ""||username=="")
            Alert.alert('', 'Please input all required information');
        else {
            if (rePassm != password) {
                Alert.alert('', 'Password did not match. Please try again.')
            }
            else {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        AddUser(user)
                        Alert.alert('', 'Registration successful! \nPlease continue to login.')
                        navigation.navigate('Login')
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        Alert.alert('', errorMessage)
                        // ..
                    });

            }

        }
    }

    async function AddUser(user)
    {
        try {
            await setDoc(doc(db, "users",user.uid), {
              username: username,
              email: email,
              uid: user.uid,
              history:[],
              library:[]
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }


    }

    const navigateToLogin = () => {
        navigation.navigate('Login')
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
            }}>Register</Text>
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
                        marginTop: 10,
                        color: 'white'
                    }}>
                        Username:
                    </Text>

                    <TextInput
                        placeholderTextColor={'white'}
                        placeholder='Type in your username'
                        style={{
                            marginTop: 0,
                            color: 'white',
                            marginEnd: 10,
                            borderBottomWidth: 2,
                            borderBottomColor: 'white',
                            marginStart: 10,
                            minWidth: 300,
                        }}
                        onChangeText={(text) => setUsername(text)}
                        value={username}   >
                    </TextInput>
                    <Text style={{
                        fontWeight: '800',
                        fontSize: 20,
                        marginStart: 10,
                        marginTop:10,
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
                    <Text style={{
                        fontWeight: '800',
                        fontSize: 20,
                        marginStart: 10,
                        color: 'white',
                        marginTop: 10
                    }}>
                        Retype Password:
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
                        onChangeText={(text) => setRePass(text)}
                        value={rePassm}>
                    </TextInput>


                    <TouchableHighlight style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderWidth: 5,
                        borderColor: 'white',
                        width: 100,
                        height: 40,
                        marginTop: 50,
                        borderRadius: 8,
                    }}
                        onPress={registerCheck} >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: '600',
                            borderRadius: 5
                        }}>
                            Register
                        </Text>
                    </TouchableHighlight>
                    <Text style={{
                        alignSelf: 'center',
                        color: 'white',
                        fontSize: 15,
                        marginTop: 100,
                        fontWeight: '500'
                    }}>Already have account?</Text>
                    <TouchableHighlight
                        onPress={navigateToLogin}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            borderWidth: 5,
                            borderColor: 'white',
                            width: 100,
                            height: 40,
                            marginTop: 10,
                            borderRadius: 8,
                        }}>
                        <Text style={{
                            alignSelf: 'center',
                            color: 'white',
                            fontSize: 15,
                            fontWeight: '500'
                        }}>Login</Text>
                    </TouchableHighlight>
                </View>
            )
            }
        </View>
    </SafeAreaView>);
}

export default RegisterScreen

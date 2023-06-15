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
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
const auth = getAuth(app);


const apiKey = "12ac99b1218346a48dce60a6266c7a3a"; //"12ac99b1218346a48dce60a6266c7a3a";

function ResetPassword({ navigation, route }) {
    const [email, setEmail] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const error = 'There is error while loading. \n (Ｔ▽Ｔ)'

    function handleBackPress(){
        navigation.goBack();
        return true
    }


    useEffect(()=>{
        BackHandler.addEventListener("hardwareBackPress",handleBackPress)
        return() =>{
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
        }
    },[])

    const navigateToLogin = () => {
        navigation.navigate('Login')
    }
    resetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Notification','Password reset mail has been sent. Please check your email.')
                navigateToLogin()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                Alert.alert('Failed','Failed to update password. Please try again later.')
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
            }}>Reset Password</Text>
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
           
                    <TouchableHighlight style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderWidth: 5,
                        borderColor: 'white',
                        width: 300,
                        height: 40,
                        marginTop: 50,
                        borderRadius: 8,
                    }}
                        onPress={resetPassword} >
                        <Text style={{
                            alignSelf: 'center',
                            color: 'white',
                            fontSize: 15,
                            fontWeight: '500'
                        }}>
                            Send password reset email
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
                            width: 200,
                            height: 40,
                            marginTop: 10,
                            borderRadius: 8,
                        }}>
                        <Text style={{
                            alignSelf: 'center',
                            color: 'white',
                            fontSize: 15,
                            fontWeight: '500'
                        }}>Back to Login</Text>
                    </TouchableHighlight>            
                </View>
            )
            }
        </View>
    </SafeAreaView>);
}

export default ResetPassword

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

const apiKey = "12ac99b1218346a48dce60a6266c7a3a"; //"12ac99b1218346a48dce60a6266c7a3a";
const db = SQLite.openDatabase('example.db');

function LoginScreen({ navigation, route }) {
    const [db, setDb] = useState(SQLite.openDatabase('example.db'));
    const [usersdb, setuserdb] = useState([]);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const error = 'There is error while loading. \n (Ｔ▽Ｔ)'

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM constants', [], (_, { rows }) =>
                setuserdb(rows._array)
            );
            setIsLoading(false);
        });
    }, []);

    loginCheck = () => {
        let isloggedin=false;
        for (let userinfo of usersdb) {
            if (username == userinfo.username && password == userinfo.password)
            {
                console.log(usersdb)
                navigation.navigate('Dishes', { currentUser: username})
                isloggedin=true;
            }
      
        }
        if(!isloggedin)
        Alert.alert('','Username or password is incorrect.\nPlease try again.')
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
        }}/>
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
                </View>
            )
            }
        </View>
    </SafeAreaView>);
}

export default LoginScreen

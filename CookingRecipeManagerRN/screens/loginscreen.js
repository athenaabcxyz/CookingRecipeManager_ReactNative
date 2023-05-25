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
} from 'react-native'
import * as SQLite from "expo-sqlite";
import { useRoute } from '@react-navigation/native';

const apiKey = "12ac99b1218346a48dce60a6266c7a3a"; //"12ac99b1218346a48dce60a6266c7a3a";
const db = SQLite.openDatabase('example.db');

function LoginScreen({ navigation, route }) {
    const [db, setDb] = useState(SQLite.openDatabase('example.db'));
    const [usersdb, setuserdb] = useState([]);
    const [currentUser, setCurrentUser] = useState();
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
        if (route && route.params) setCurrentUser(route.params.currentUser)
    }, []);

    loginCheck = () => {
        for (let userinfo of usersdb) {
            if (username == userinfo.username && password == userinfo.password)
            {
                setCurrentUser(userinfo.username)
                console.log(usersdb)
                navigation.navigate('Instruction', { currentUser: currentUser, id: 716429 })
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
            }}>Login</Text>
        </View>
        <View>
            {isLoading ? (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View>
                        <Text style={{
                            fontWeight: '400',
                            fontSize: 20,
                        }}>
                            Username
                        </Text>

                        <TextInput
                            style={{
                                backgroundColor: '#d9d9d9',
                                borderRadius: 5,
                                marginTop: 20,
                                marginBottom: 40,
                                minWidth: 300,
                            }}
                            onChangeText={(text) => setUsername(text)}
                            value={username}   >
                        </TextInput>

                        <Text style={{
                            fontWeight: '400',
                            fontSize: 20,
                        }}>
                            Password
                        </Text>

                        <TextInput
                            secureTextEntry={true}
                            style={{
                                backgroundColor: '#d9d9d9',
                                borderRadius: 5,
                                marginTop: 20,
                                marginBottom: 40,
                                minWidth: 300,
                            }}
                            onChangeText={(text) => setPassword(text)}
                            value={password}>
                        </TextInput>

                        <TouchableHighlight style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#1FA97C',
                            width: 100,
                            height: 40,
                            marginTop: 20,
                            borderRadius: 5,
                        }}
                            onPress={loginCheck} >
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                fontWeight: '300',
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

import React, { useState, useEffect } from 'react';
import IngredientItem from '../itemComponents/ingredientitem';
import RecipeItem from '../itemComponents/recipeItem';
import SimilarItem from '../itemComponents/similaritem';
import Modal from 'react-native-modal';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
    View,
    Text,
    RefreshControl,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    BackHandler, Dimensions,
    TextView,
    Alert,
    TextInput,
    TouchableHighlight
} from 'react-native'


import { useRoute } from '@react-navigation/native';
import { Firestore, arrayRemove, getFirestore } from "firebase/firestore";
import { updatePassword, getAuth } from 'firebase/auth';
import app from '../components/firebaseConfig';
import { collection, query, where, getDocs, updateDoc,arrayUnion, doc, getDoc} from "firebase/firestore";

const db = getFirestore(app);
const auth = getAuth(app);
const currentUser = auth.currentUser;
const apiKey = "e6f3dc1b857f4ad0b84684bcf2da349d"; //"12ac99b1218346a48dce60a6266c7a3a";


function User({ navigation, route }) {
    const currentScreen = "User";
    const [password, setPassword] = useState("");
    const [rePassm, setRePass] = useState("");
    const [user, setuser] = useState(route.params.currentUser)
    const [historyData, setHistoryData] = useState([]);
    const [libraryData, setLibraryData] = useState([]);
    const [isChangePasswordShowed, setChangePasswordShowing] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [history, setHistory] = useState([]);
    const [library, setLibrary] = useState([]);


    async function updateUser(){
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setuser(doc.data())
        });
      
    }
    function handleBackPress(){
        navigation.goBack();
        return true
    }


    useEffect(()=>{
        updateUser()
        BackHandler.addEventListener("hardwareBackPress",handleBackPress)
        return() =>{
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
        }
    },[])

    const toggleChangePassword = () => {
        setChangePasswordShowing(!isChangePasswordShowed);
    };

    const changePassword = () =>{
        if(password==rePassm)
        {
            updatePassword(currentUser, password).then(()=>{
                Alert.alert('Update Password', 'Password update successfully.')
                toggleChangePassword()
            }).catch((error)=>{
                console.log(error)
                Alert.alert('Failed','Failed to update password. Please try again later.')
            })
        }
        else
        Alert.alert('Password mismatch','The two password did not match. Please try again.');
    }

    const logout = () =>{
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
       })
    }

    useEffect(()=>{
        setHistory(user.history.slice(0).reverse().map(element =>{return element}))
        setLibrary(user.library)
    },[user])

    async function SaveToHistory(id) {
        const docRef = doc(db, "users", user.uid);

        // Atomically add a new region to the "regions" array field.
        await updateDoc(docRef, {
            history: arrayRemove(id)
        });
        await updateDoc(docRef, {
            history: arrayUnion(id)
        });
    }
    function selectRecipe(item) {
        SaveToHistory(item)
        navigation.navigate('Detail', { id: item.id, currentUser: user })
    }

    return (<SafeAreaView style={{
        backgroundColor: "orange",
        justifyContent: 'flex-start',
        flex: 1,
        marginTop: StatusBar.currentHeight
    }}>
         <Modal isVisible={isChangePasswordShowed}>
            <View style={{
                marginTop: 100,
                marginStart: 30,
                marginEnd: 50, 
                backgroundColor:'orange',
                borderWidth: 10,
                borderRadius: 5,
                borderColor: 'white',
                width: 300,
                height: 300
            }}>       
                <Text style={{
                    fontWeight: '800',
                    fontSize: 20,
                    marginStart: 10,
                    color: 'white',
                    marginTop: 10
                }}>
                    New Password:
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
                        maxWidth: 300,
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
                    Retype New Password:
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
                        maxWidth: 300,
                    }}
                    onChangeText={(text) => setRePass(text)}
                    value={rePassm}>
                </TextInput>
                <View style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableHighlight style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginStart: 20, 
                        borderWidth: 5,
                        borderColor: 'white',
                        width: 100,
                        height: 40,
                        marginTop: 50,
                        borderRadius: 8,
                    }}
                        onPress={changePassword} >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: '600',
                            borderRadius: 5
                        }}>
                            Confirm
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderWidth: 5,
                        borderColor: 'white',
                        width: 100,
                        marginStart: 20,
                        height: 40,
                        marginTop: 50,
                        borderRadius: 8,
                    }}
                        onPress={toggleChangePassword} >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: '600',
                            borderRadius: 5
                        }}>
                            Cancel
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
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
            }}>User</Text>
            <View style={{ flex: 1 }} />
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                marginStart: 110,
                marginTop: 5,
                marginEnd: 10
                //fontFamily: 'Sigmar-Regular'
            }}>{user.username}</Text>
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Text style={{
                        marginTop: 10,
                        borderWidth: 3,
                        borderColor: 'white',
                        width:380,
                        borderRadius:5,
                        backgroundColor:'white',
                        textAlign: 'center',
                        color: 'orange',
                        fontWeight: 'bold',
                        fontSize: 25,
                    }}>Library</Text>
                    <View style={{
                        flex: 1,
                        marginTop: 10,
                        marginStart: 10,
                        marginEnd: 10,
                        marginBottom: 10,
                        borderWidth:4,
                        borderColor:'white',
                        borderRadius:5,
                        width:380,
                        padding:10,
                        alignContent: 'center',
                        justifyContent: 'center',
                        height: 500
                    }}>
                        {library.length<=0?(<Text style={{
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 25,
                        }}>
                            Your library is currently empty.
                        </Text>):(
                        <FlatList
                            nestedScrollEnabled={true}
                            data={library}
                            renderItem={({ item }) => (<RecipeItem item={item} onPress={() => selectRecipe(item)} />)}
                            keyExtractor={item => item.id}
                        />)}
                    </View>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: 10,
                }}>
                    <Text style={{
                         marginTop: 20,
                         borderWidth: 3,
                         borderColor: 'white',
                         width:380,
                         borderRadius:5,
                         backgroundColor:'white',
                         textAlign: 'center',
                         color: 'orange',
                         fontWeight: 'bold',
                         fontSize: 25,
                    }}>Recently Viewed</Text>
                    <View style={{
                        height: 120,
                        marginTop: 10,
                        marginStart: 10,
                        marginEnd: 10,
                        marginBottom: 10,
                        borderWidth:4,
                        borderColor:'white',
                        borderRadius:5,
                        width:380,
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}>
                        {history<=0?(<Text style={{
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 25,
                        }}>
                            Your haven't view anything yet.
                        </Text>):(<FlatList
                            nestedScrollEnabled={true}
                            horizontal={true}
                            data={history}
                            renderItem={({ item }) => (<SimilarItem item={item} onPress={() => selectRecipe(item)} />)}
                            keyExtractor={item => item.id}
                        />)}

                    </View>
                </View>
                <View style={{
                    flex: 0.08,
                    alignItems: 'center',
                    marginTop: 10
                }}>
                    <TouchableOpacity
                        onPress={toggleChangePassword}
                        style={{
                            borderWidth: 5,
                            borderColor: 'white',
                            borderRadius: 10,
                            backgroundColor: 'orange',
                            width: 300,
                            justifyContent: 'center',
                            marginTop: 10,
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                            Change password</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 0.08,
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 20
                }}>
                    <TouchableOpacity
                        onPress={logout}
                        style={{
                            borderWidth: 5,
                            borderColor: 'white',
                            borderRadius: 10,
                            backgroundColor: 'orange',
                            width: 300,
                            justifyContent: 'center',
                            marginTop: 10,
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                            Logout</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        )}
    </SafeAreaView>);
}

export default User

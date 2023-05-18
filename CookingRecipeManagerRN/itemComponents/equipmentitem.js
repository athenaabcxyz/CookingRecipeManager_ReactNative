import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'


import TextTicker from 'react-native-text-ticker';


function EquipmentItem({ item }) {

    let imageURL = "https://spoonacular.com/cdn/equipments_100x100/" + item.image;

    const words = item.name.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    let equipmentName = words.join(" ");

    return (
        <View
            style={{
                width: 60,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
                marginTop: 5,
                flexDirection: 'column',
                borderRadius: 10,
                backgroundColor: 'white',
                alignitems: 'center'
            }}>
            <Image
                style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'cover',
                    borderRadius: 5,
                    borderColor: 'green',
                    marginTop: 5,
                    borderWidth: 2
                }}
                source={{
                    uri: imageURL
                }} />
            <View style={{
                flex: 1,
                marginRight: 0,
            }}>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 12,
                        marginRight: 5,
                    }}>{equipmentName}</Text>
            </View>
        </View>
    )
}

export default EquipmentItem
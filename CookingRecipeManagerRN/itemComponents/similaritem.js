import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'


import TextTicker from 'react-native-text-ticker';


function SimilarItem({item, onPress}) {

    const imageUrl= 'https://spoonacular.com/recipeImages/'+item.id+'-480x360.'+item.imageType;

    return (
        <TouchableOpacity
        onPress={onPress}
            style={{
                height: 100,
                width: 100,
                marginTop: 5,
                marginEnd: 5,
                flexDirection: 'row',
                alignContent: 'center',
                borderRadius: 10,
            }}>
            <Image
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'cover',
                    borderRadius: 10,
                    marginRight: 15,
                }}
                source={{
                    uri: imageUrl
                }} />
        </TouchableOpacity>
    )
}

export default SimilarItem
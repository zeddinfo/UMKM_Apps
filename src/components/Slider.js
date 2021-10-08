import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const Slider = ({ uri }) => {
    return (
        <View>
            <Image source={{ uri: uri }} style={styles.image} />
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 320,
        borderRadius: 10,
    }
})

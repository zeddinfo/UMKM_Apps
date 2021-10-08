import React from 'react'
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import { fonts } from '../themes/fonts';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Actions } from 'react-native-router-flux';
const { width } = Dimensions.get('screen');

const Header = ({ title }) => {
    console.log(title);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                hidden={false} barStyle="dark-content"
            />
            <View style={styles.content}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <Icons name="arrow-left" color="black" size={15} />
                </TouchableOpacity>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.text}></Text>
            </View>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        paddingTop: 10,
    },
    text: {
        fontFamily: fonts.primary.bold,
        fontSize: 15,
        marginLeft: width / 3,
    },
    content: {
        flexDirection: 'row',
    }
})

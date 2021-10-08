import React, { useEffect } from 'react'
import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('screen');

const SplashScreen = () => {

    useEffect(() => {
        setTimeout(() => {
            Actions.Home();
        }, 3000)
    }, [])

    return (
        <View>
            <StatusBar
                hidden={false} backgroundColor="transparent" translucent={true} barStyle="dark-content"
            />
            <ImageBackground source={require('../../assets/images/bg-splash.png')} resizeMode="cover" style={styles.image}>
                <Image source={require('../../assets/logo/logo.png')} style={styles.logo} />
            </ImageBackground>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
    },
    logo: {
        width: 150,
        height: 150,
        position: 'absolute',
        top: width,
    }
})

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import { HomeScreen } from './pages/Home';
import { ListAll } from './pages/ListAll';
import { SplashScreen } from './pages/onBoot';
import { DetailProduct } from './pages/Product';
import { DetailToko } from './pages/Store';

const stateHandler = (prevState, newsState, action) => {
    // console.log('onstatechange : ACTION:', action);
};

const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

const AppNavigator = () => {
    return (
        <Router
            onStateChange={stateHandler}
            sceneStyle={styles.screen}
            uriPrefix={prefix}
        >
            <Scene key="Root" hideNavBar={true}>
                <Scene
                    key="Splashscreen"
                    component={SplashScreen}
                    hideNavBar={true}
                    type="reset"
                />
                <Scene
                    key="Home"
                    component={HomeScreen}
                    type="reset"
                />
                <Scene
                    key="ListAll"
                    component={ListAll}
                />
                <Scene
                    key="DetailToko"
                    component={DetailToko}
                />
                <Scene
                    key="DetailProduct"
                    component={DetailProduct}
                />
            </Scene>
        </Router>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})

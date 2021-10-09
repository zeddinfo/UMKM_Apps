import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { fonts } from '../themes/fonts';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Gap from '../gap';


const HeaderHome = ({ alamat }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                {/* <Icons name="map-marker-alt" size={14} color="#0aada8" /> */}
                {/* <Gap width={5} /> */}
                <Text style={styles.text}>UMKM Apps</Text>
            </View>
            <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />
        </View>
    )
}

export default HeaderHome

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: fonts.primary.bold,
        fontSize: 15,
        maxWidth: 250,
        color: '#0aada8'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
    }
})

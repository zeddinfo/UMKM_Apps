import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Icons from 'react-native-vector-icons/AntDesign';
import F5Icons from 'react-native-vector-icons/FontAwesome5';
import Enctype from 'react-native-vector-icons/Entypo';
import Gap from '../gap';
import { fonts } from '../themes/fonts';
import NumberFormat from 'react-number-format';

const ProdukCard = ({ nama, stok, harga, item, url }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: url }} style={styles.image} />
            <Gap width={20} />
            <View style={{ width: 200 }}>
                <View style={{ flexDirection: 'row', alignContents: 'center', alignItems: 'center' }}>
                    <F5Icons name="store" />
                    <Gap width={5} />
                    <Text style={styles.nama}>{nama}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignContents: 'center', alignItems: 'center' }}>
                    <F5Icons name="cart-arrow-down" color="red" />
                    <Gap width={5} />
                    <Text style={styles.jarak}>Tesedia {stok}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignContents: 'center', alignItems: 'center' }}>
                    <Enctype name="price-tag" color="grey" />
                    <Gap width={5} />
                    <NumberFormat
                        value={harga}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp '}
                        renderText={(value) => (
                            <Text style={styles.alamat}>{value}</Text>
                        )}
                    />
                </View>
            </View>
            {/* <Gap width={} /> */}
            <View style={styles.detail}>
                <Icons name="right" color="white" size={20} />
            </View>
        </View>
    )
}

export default ProdukCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    nama: {
        fontFamily: fonts.primary.bold,
        fontSize: 14,
        color: 'black',
    },
    alamat: {
        fontFamily: fonts.primary.bold,
        fontSize: 13,
        color: 'grey',

    },
    jarak: {
        fontFamily: fonts.primary.normal,
        color: 'red',

    },
    detail: {
        backgroundColor: '#0aada8',
        width: 25,
        height: 25,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25 / 2
    }
})

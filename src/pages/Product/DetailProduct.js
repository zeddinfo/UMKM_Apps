import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { Header } from '../../components'
import Gap from '../../gap';
import { fonts } from '../../themes/fonts';
const { width, height } = Dimensions.get('screen')


const DetailProduct = (props) => {
    const { data } = props;
    console.log('data', data);
    return (
        <View style={styles.page}>
            <Header title="Detail Product" />
            <Image source={{ uri: data.url_file }} style={styles.image} />

            <Gap height={10} />
            <View style={styles.content}>
                <Text style={styles.text}>Nama Barang : {data.nama_product}</Text>
                <Text style={styles.text}>Ukuran : {data.ukuran}</Text>
                <Text style={styles.text}>Stok Barang : {data.stok}</Text>
                <Text style={styles.text}>Motif Barang : {data.motif}</Text>
                <Text style={styles.text}>Bahan Barang : {data.bahan}</Text>
            </View>
        </View>
    )
}

export default DetailProduct

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: width, height: width / 2,
        resizeMode: 'cover'
    },
    text: {
        fontFamily: fonts.primary.bold
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    }
})

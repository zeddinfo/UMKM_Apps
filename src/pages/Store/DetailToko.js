import React from 'react'
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { CardList, Header, ProdukCard } from '../../components'
import SearchBar from '../../components/SearchBar';
import { produk_list } from '../../data/product';
import { umkm_all } from '../../data/umkm_all';
import Gap from '../../gap';
import ApiConfig from '../../helpers/ApiConfig';
import { fonts } from '../../themes/fonts';
const { width } = Dimensions.get('screen');

const DetailToko = (props) => {
    const { data } = props;
    const [toko, setToko] = useState(null);
    const id = data.id_umkm;

    const getDetailToko = async () => {
        await ApiConfig.get(`umkm/${id}`)
            .then((response) => {
                const respon = response.data;
                console.log('respon', respon)
                setToko(respon.data);
                console.log('toko is', toko.alamat);
            })
            .catch((error) => {
                console.log('error', error);
            })
    }

    useEffect(() => {
        getDetailToko();
    }, [])

    const renderList = ({ item, index }) => {
        return (
            <ProdukCard nama={item.nama_product} harga={item.harga} stok={item.stok} item={item} url={item.url_file} onPress={() => Actions.DetailProduct({ data: item })} />
        )
    }

    const ListEmptyComponent = () => {
        return (
            <View style={styles.emptyCompnent}>
                <Image source={require('../../assets/images/not-found.png')} style={styles.imageNotFound} />
                <Text style={styles.text}>Oops, Sepertinya data tidak ditemukan</Text>
            </View>
        )
    }

    return (
        <View style={styles.page}>
            <Header title="Detail Toko" />
            <View>
                {toko != null ? <Image source={{ uri: toko.url_file }} style={styles.image} /> : <ActivityIndicator size={30} color="green" />}

            </View>
            <Gap height={10} />
            <View style={styles.detail}>
                <View style={styles.isi}>
                    <Text style={styles.title}>Nama Toko</Text>
                    <Text style={styles.separator}>:</Text>
                    <Text style={styles.subtitle}>{toko != null ? toko.nama : '-'}</Text>
                </View>
                <View style={styles.isi}>
                    <Text style={styles.title}>Alamat Toko</Text>
                    <Text style={styles.separator}>:</Text>
                    <Text style={styles.subtitle}>{toko != null ? toko.alamat : '-'}</Text>
                </View>
            </View>
            <Gap height={20} />
            <View style={styles.listProduk}>
                <SearchBar placeholder="Silahkan cari produk" />
            </View>
            <Gap height={20} />
            {toko != null ? <FlatList
                data={toko.products}
                renderItem={renderList}
                keyExtractor={(item, index) => 'index-' + index.toString()}
                ListEmptyComponent={ListEmptyComponent}
                showsVerticalScrollIndicator={false}
            /> : <ActivityIndicator size={20} color="green" />}

        </View>
    )
}

export default DetailToko

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: width, height: width / 2,
        resizeMode: 'cover'
    },
    detail: {
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: fonts.primary.bold
    },
    subtitle: {
        fontFamily: fonts.primary.bold,
        color: 'grey'
    },
    separator: {
        fontFamily: fonts.primary.bold,
        color: 'black'
    },
    isi: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'flex-start',
        alignItems: 'flex-start'
    },
    listProduk: {
        paddingHorizontal: 10,
    },
    emptyCompnent: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: fonts.primary.bold,
        fontSize: 15
    },
    imageNotFound: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    }
})

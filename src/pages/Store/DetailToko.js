import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { CardList, Header, ProdukCard } from '../../components'
import SearchBar from '../../components/SearchBar';
import { produk_list } from '../../data/product';
import { umkm_all } from '../../data/umkm_all';
import Gap from '../../gap';
import { fonts } from '../../themes/fonts';
const { width } = Dimensions.get('screen');

const DetailToko = (props) => {
    const { data } = props;

    const renderList = ({ item, index }) => {
        return (
            <ProdukCard nama={item.nama} harga={item.harga} stok={item.stok} item={item} url={item.url} />
        )
    }

    const ListEmptyComponent = () => {
        return (
            <Text>Tidak ada data</Text>
        )
    }

    return (
        <View style={styles.page}>
            <Header title="Detail Toko" />
            <View>
                <Image source={{ uri: data.url }} style={styles.image} />
            </View>
            <Gap height={10} />
            <View style={styles.detail}>
                <View style={styles.isi}>
                    <Text style={styles.title}>Detail Toko</Text>
                    <Text style={styles.separator}>:</Text>
                    <Text style={styles.subtitle}>{data.nama}</Text>
                </View>
                <View style={styles.isi}>
                    <Text style={styles.title}>Alamat Toko</Text>
                    <Text style={styles.separator}>:</Text>
                    <Text style={styles.subtitle}>{data.alamat}</Text>
                </View>
            </View>
            <Gap height={20} />
            <View style={styles.listProduk}>
                <SearchBar placeholder="Silahkan cari produk" />
            </View>
            <Gap height={20} />
            <FlatList
                data={produk_list}
                renderItem={renderList}
                keyExtractor={(item, index) => 'index-' + item.id.toString()}
                ListEmptyComponent={ListEmptyComponent}
                showsVerticalScrollIndicator={false}
            />
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
    }
})

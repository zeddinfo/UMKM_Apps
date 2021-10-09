
import React, { useRef, useEffect } from 'react'
import { useState } from 'react'
import { Dimensions, FlatList, StatusBar, Image, StyleSheet, Text, View, BackHandler, PermissionsAndroid, TouchableOpacity } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import Carousel from 'react-native-snap-carousel'
import { Slider } from '.'
import { CardList, CustomSwitch, Header, HeaderHome, MapCard } from '../../components'
import SearchBar from '../../components/SearchBar'
import { carousel } from '../../data/carousel'
import { umkm_all } from '../../data/umkm_all'
import { umkm_terdekat } from '../../data/umkm_terdekat'
import Gap from '../../gap'
import { fonts } from '../../themes/fonts'
import Geolocation from 'react-native-geolocation-service';
import { Actions } from 'react-native-router-flux'
import Geocoder from 'react-native-geocoding';
import ApiConfig from '../../helpers/ApiConfig'


const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
    const ref = useRef(null);
    const [semua, setSemua] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [ready, setReady] = useState(true);
    const [listTerdekat, setListtTerdekat] = useState([]);
    const [allUmkm, setUmkm] = useState([]);
    // Geocoder.init("AIzaSyCVjf6zY-DeY9MPtgMv76JecMzmldqYLKo");

    const UmkmTTerdekat = async () => {
        const params = {
            lat: global.latitude,
            long: global.longitude,
        }
        await ApiConfig.post('umkm_terdekat', params)
            .then((response) => {
                const respon = response.data;
                setListtTerdekat(respon.data);

            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    const ListAllUmkm = async () => {
        await ApiConfig.get('umkm')
            .then((response) => {
                const respon = response.data;
                setUmkm(respon.data);
            })
            .catch((error) => {
                console.log('error', error);
            })
    }

    const backAction = () => {
        setShowAlert(true);
    }

    useEffect(() => {
        UmkmTTerdekat();
        ListAllUmkm();
    }, [])

    const getLocation = async () => {
        setReady(false);
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Akses Lokasi',
                    'message': 'Izinkan akses lokasi '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log("You can use the location")
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position);
                        const location = position.coords;
                        global.longitude = location.longitude;
                        global.latitude = location.latitude;
                        setReady(true);
                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                        setReady(true);

                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, forceRequestLocation: true, showLocationDialog: true }
                );

            } else {
                console.log("location permission denied")
                setReady(false);
                alert("Location permission denied");
            }
        } catch (err) {
            console.warn(err)
        }

    }


    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, []);

    // useEffect(() => {

    //     const geoLocation = async () => {
    //         const result = await Geocoder.from(global.latitude, global.longitude)
    //             .then(json => {
    //                 var addressComponent = json.results[0].formatted_address;
    //                 // console.log(addressComponent.split(',')[0]);
    //                 setAlamat(addressComponent.split(',')[0]);

    //             })
    //             .catch(error => console.warn(error));
    //     }

    //     if (ready) {
    //         // geoLocation();
    //     }

    // }, [ready])

    useEffect(() => {
        getLocation();
    }, [])

    const renderItem = ({ item, index }) => {
        return (
            <Slider uri={item.url} />
        )
    }

    const renderListSemua = ({ item, index }) => {
        console.log('item semua', item);
        return (
            <CardList nama={item.nama} url={item.url_file} website={item.website} alamat={item.alamat} jarak={item.jarak} items={item} onPress={() => Actions.DetailToko({ data: item })} />
        )
    }

    const renderList = ({ item, index }) => {
        console.log('item', item);
        return (
            <CardList nama={item.nama} url={item.url_file} alamat={item.alamat} jarak={item.jarak} items={item} onPress={() => Actions.DetailToko({ data: item })} />
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

    const onSelectSwitch = (value) => {
        setSemua(value)
        console.log('value', value);
    }
    return (
        <View style={styles.page}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <HeaderHome />
            <Gap height={5} />
            <View style={styles.searchBar}>
                <SearchBar placeholder="Silahkan cari sesuatu" />
            </View>
            <Gap height={10} />
            <View style={styles.produkFavorit}>
                <Text style={{ fontFamily: fonts.primary.bold }}>
                    Pemetaan UMKM
                </Text>
                <TouchableOpacity onPress={() => Actions.ListAll()}>
                    <Text style={{ fontFamily: fonts.primary.bold, color: '#0aada8' }}>
                        Lihat Semua
                    </Text>
                </TouchableOpacity>
            </View>
            <Gap height={10} />
            <View>
                <Carousel
                    ref={ref}
                    data={carousel}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={320}
                    loop={true}
                    autoplay={true}
                    autoplayDelay={3000}
                    autoplayInterval={3000}
                />
            </View>
            <Gap height={10} />
            <View style={styles.umkm}>
                <Text style={{ fontFamily: fonts.primary.bold, color: 'black' }}>List UMKM</Text>
            </View>

            <Gap height={10} />
            <View style={styles.listData}>
                <CustomSwitch
                    selectionMode={1}
                    option1="Terdekat"
                    option2="Semua"
                    onSelectSwitch={onSelectSwitch}
                />
            </View>
            <Gap height={15} />
            {/* <View style={styles.listData}> */}
            {semua == 1 ? <FlatList
                data={listTerdekat}
                renderItem={renderList}
                keyExtractor={(item, index) => 'index-' + index.toString()}
                ListEmptyComponent={ListEmptyComponent}
                showsVerticalScrollIndicator={false}
            /> : <FlatList
                data={allUmkm}
                renderItem={renderListSemua}
                keyExtractor={(item, index) => 'index-' + index.toString()}
                ListEmptyComponent={ListEmptyComponent}
                showsVerticalScrollIndicator={false}
            />}

            {/* </View> */}

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title={
                    <Text style={{ fontFamily: fonts.primary.bold }}>Perhatian</Text>
                }
                message={
                    <Text style={{ fontFamily: fonts.primary.normal }}>
                        Apakah anda yakin ingin keluar aplikasi?
                    </Text>
                }
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText={
                    <Text style={{ fontFamily: fonts.primary.normal }}>Tidak</Text>
                }
                confirmText={
                    <Text style={{ fontFamily: fonts.primary.normal }}>
                        Ya, Keluar
                    </Text>
                }
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setShowAlert(false);
                }}
                onConfirmPressed={() => {
                    BackHandler.exitApp();
                }}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchBar: {
        paddingHorizontal: 10,
    },
    produkFavorit: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listData: {
        paddingHorizontal: 10,
    },
    umkm: {
        paddingHorizontal: 10,
    },
    imageNotFound: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginTop: width / 7
    },
    emptyCompnent: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: fonts.primary.bold,
        fontSize: 15
    }
})

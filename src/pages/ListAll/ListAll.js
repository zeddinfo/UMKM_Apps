import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, Platform, StyleSheet, Text, View } from 'react-native'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { CardList, Header, MapCard } from '../../components'
import Geolocation from "react-native-geolocation-service" // 👈
import { fonts } from '../../themes/fonts';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { customStyleMap } from '../../components/MapStyle';
import { umkm_all } from '../../data/umkm_all';
const { width } = Dimensions.get('screen');

const ListAll = () => {

    const [location, setLocation] = useState(null) // 👈

    const handleLocationPermission = async () => { // 👈
        let permissionCheck = '';
        if (Platform.OS === 'ios') {
            permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

            if (
                permissionCheck === RESULTS.BLOCKED ||
                permissionCheck === RESULTS.DENIED
            ) {
                const permissionRequest = await request(
                    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                );
                permissionRequest === RESULTS.GRANTED
                    ? console.warn('Location permission granted.')
                    : console.warn('location permission denied.');
            }
        }

        if (Platform.OS === 'android') {
            permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

            if (
                permissionCheck === RESULTS.BLOCKED ||
                permissionCheck === RESULTS.DENIED
            ) {
                const permissionRequest = await request(
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                );
                permissionRequest === RESULTS.GRANTED
                    ? console.warn('Location permission granted.')
                    : console.warn('location permission denied.');
            }
        }
    };

    useEffect(() => {
        handleLocationPermission()
    }, []);

    useEffect(() => { // 👈
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                setLocation({ latitude, longitude })
            },
            error => {
                console.log(error.code, error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }, []);

    const renderList = ({ item, index }) => {
        return (
            <CardList nama={item.nama} url={item.url} alamat={item.alamat} jarak={item.jarak} />
        )
    }

    const ListEmptyComponent = () => {
        return (
            <Text>Tidak ada data</Text>
        )
    }


    return (
        <View style={styles.page}>
            <Header title="Semua UMKM" />
            {location ? <View style={styles.mapcontainer}>
                <MapView
                    // ref={sheetRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    showsUserLocation={true}
                    // showsMyLocationButton={true}
                    customMapStyle={customStyleMap}
                    paddingAdjustmentBehavior="automatic"
                    showsMyLocationButton={true}
                    showsBuildings={true}
                    maxZoomLevel={17.5}
                    loadingEnabled={true}
                    loadingIndicatorColor="#fcb103"
                    loadingBackgroundColor="#242f3e"
                    loadingEnabled={true}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.025,
                        longitudeDelta: 0.0221,
                    }}
                >
                    {umkm_all.map((item, index) => {
                        return (
                            <View>
                                <Marker
                                    key={index.toString()} coordinate={{
                                        latitude: item.lat,
                                        longitude: item.long,
                                    }}
                                >
                                    <Callout key={index.toString()} tooltip>
                                        <View>
                                            <View style={styles.bubble}>
                                                <Text style={styles.text}>{item.nama}</Text>

                                            </View>
                                            <View style={styles.arrowBorder}>

                                            </View>
                                            <View style={styles.arrow}>

                                            </View>
                                        </View>
                                    </Callout>
                                </Marker>

                            </View>

                        )
                    })}
                </MapView>
                {/* <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.025,
                        longitudeDelta: 0.0221,
                    }}
                    showsUserLocation={true}
                    customMapStyle={customStyleMap}
                    paddingAdjustmentBehavior="automatic"
                    showsMyLocationButton={true}
                    showsBuildings={true}
                    maxZoomLevel={17.5}
                    loadingEnabled={true}
                    loadingIndicatorColor="#fcb103"
                    loadingBackgroundColor="#242f3e"
                />
                <Marker coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                }}
                    title="Hello"
                />
                <MapView /> */}
            </View> : <Text style={{ fontFamily: fonts.primary.bold, color: 'black' }}>Sedang memuat lokasi ...</Text>}
            <FlatList
                data={umkm_all}
                renderItem={renderList}
                keyExtractor={(item, index) => 'index-' + item.id.toString()}
                ListEmptyComponent={ListEmptyComponent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default ListAll

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    mapcontainer: {
        height: width / 1.5,
        width: width,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',

    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
    },
    bubble: {

        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.6,
        padding: 14,
        width: 150
    },
    image: {
        width: 100,
        height: 100,
    },
    text: {
        fontFamily: fonts.primary.bold
    }
})

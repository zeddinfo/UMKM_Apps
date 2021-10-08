import React, { useRef } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const { width, height } = Dimensions.get('screen');
const mapRef = React.createRef();

const MapCard = ({ long, lat }) => {
    const sheetRef = React.useRef(null);

    return (
        <View style={styles.mapcontainer}>
            <MapView
                ref={sheetRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                // showsMyLocationButton={true}
                loadingEnabled={true}
                initialRegion={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker coordinate={{
                    latitude: lat,
                    longitude: long,
                }}
                    title="Hello"
                />
            </MapView>
        </View>
    )
}

export default MapCard

const styles = StyleSheet.create({
    mapcontainer: {
        height: width / 2,
        width: width,
        justifyContent: 'center',
        backgroundColor: 'red',
        alignContent: 'center',
        alignItems: 'center',

    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})

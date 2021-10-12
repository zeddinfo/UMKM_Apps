import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome5'
import Gap from '../gap';

const SearchBar = ({ placeholder, value, onChange }) => {

    const [border, setBorder] = useState('#e1e1e1');
    const onFocusForm = () => {
        setBorder('#0aada8')
    }

    const onBlurForm = () => {
        setBorder('#e1e1e1');
    }

    return (
        <View style={styles.container(border)}>
            <Icons name="search" color={border} size={20} />
            <Gap width={2} />
            <TextInput placeholder={placeholder} onFocus={onFocusForm} value={value} onChangeText={onChange} onBlur={onBlurForm} />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: (border) => ({
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        borderColor: border,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
    })
})

import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fonts } from '../themes/fonts';

const CustomSwitch = ({
    selectionMode,
    option1,
    option2,
    onSelectSwitch
}) => {

    const [getSelectionMode, setSelectionMode] = useState(selectionMode);

    const updateSwitchData = (value) => {
        setSelectionMode(value);
        onSelectSwitch(value)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(1)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode == 1 ? '#0aada8' : '#e4e4e4',
                    borderRadius: 10,
                    borderColor: '#0aada8',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: getSelectionMode == 1 ? 'white' : '#0aada8',
                        fontSize: 14,
                        fontFamily: fonts.primary.normal
                    }}
                >
                    {option1}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(2)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode == 2 ? '#0aada8' : '#e4e4e4',
                    borderRadius: 10,
                    borderColor: '#0aada8',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: getSelectionMode == 2 ? 'white' : '#0aada8',
                        fontSize: 14,
                        fontFamily: fonts.primary.normal
                    }}
                >
                    {option2}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomSwitch

const styles = StyleSheet.create({
    container: {
        height: 44,
        width: '100%',
        backgroundColor: '#e4e4e4',
        borderRadius: 10,
        borderColor: '#ad40af',
        flexDirection: 'row',
        justifyContent: 'center',
    }
})

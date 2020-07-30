import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CartItem = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.mainText}>{props.itemTitle}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${Math.round(props.amt)}</Text>
                {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.delete}>
                    <Ionicons
                        name="md-trash"
                        size={23}
                        color='red' />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    quantity: {
        color: '#888',
        fontSize: 16
    },
    mainText: {
        fontWeight:'bold',
        fontSize: 16,
 
    },
    delete: {
        marginHorizontal: 20,
    },

})

export default CartItem
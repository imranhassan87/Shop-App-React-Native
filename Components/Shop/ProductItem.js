import React from 'react'
import { View, StyleSheet, Button, Text, Image } from 'react-native'


const ProductItem = props => {

    return (
        <View style={styles.product}>
            <Image style={styles.img} source={{ uri: props.image }} />
            <View style={styles.txt}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${Math.round(props.price)}</Text>
            </View>
            <View style={styles.buttonContainer}>
        {props.children}
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 25,
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: 'white',

    },
    img: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    title: {
        fontSize: 18,

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingHorizontal: 20
    },

    txt: {
        alignItems: 'center',
        paddingTop: 5
    }
})

export default ProductItem





import React from 'react'
import { View, Text, ScrollView, StyleSheet, Button, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import * as CartActions from '../../Store/Actions/Cart'

const ProductDetailScreen = props => {

    const dispatch = useDispatch()

    productId = props.navigation.getParam('pId')
    selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    return (
        <ScrollView>
            <View style={styles.details}>
                <Image style={styles.img} source={{ uri: selectedProduct.imageUrl }} />
                <View style={styles.action}><Button color='#C2185b'
                    title="Add To Cart"
                    onPress={() => {
                        dispatch(CartActions.addToCart(selectedProduct))
                    }} /></View>
                <Text style={styles.price}>${selectedProduct.price}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </View>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('pTitle')
    }
}

const styles = StyleSheet.create({
    details: {

        justifyContent: 'center'
    },
    img: {

        width: '100%',
        height: 250
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    action: {
        marginVertical: 10,
        alignItems: 'center',

    }
})

export default ProductDetailScreen
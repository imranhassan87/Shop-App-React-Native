import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, Button, View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import ProductItem from '../../Components/Shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../Components/UI/HeaderButton'
import * as CartActions from '../../Store/Actions/Cart'
import * as ProductsActions from '../../Store/Actions/Products'


const ProductOverview = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState()
    const product = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()


    const loadItems = useCallback(async () => {

        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(ProductsActions.fetchItem())
            //await new Promise(accept => dispatch(ProductsActions.fetchItem(), accept))
        }
        catch (err) {
            setError(err.message)
        }
        setIsRefreshing(false)
    }, [dispatch, setIsLoading, setError])


    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadItems)

        return () => {
            willFocusSub.remove()
        }
    }, [loadItems])


    useEffect(() => {
        setIsLoading(true)
        loadItems().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadItems])

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            pTitle: title,
            pId: id
        })
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Sorry!</Text>
                <Text>An error occured</Text>
                <View style={styles.buttonSize}><Button title="Try again" color="#EC5656" onPress={loadItems} /></View>
            </View>)
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="black" />
            </View>)
    }

    if (!isLoading && product.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Items Found!!</Text>
                <Text>Maybe start adding some :)</Text>
            </View>)
    }

    return (
        <FlatList data={product}
            onRefresh={loadItems}
            refreshing={isRefreshing}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem title={itemData.item.title}
                price={itemData.item.price}
                image={itemData.item.imageUrl}>
                <View style={styles.buttonSize}>
                    <Button
                        color='#C2185b'
                        title="View Details"
                        onPress={() => { selectItemHandler(itemData.item.id, itemData.item.title) }} /></View>
                <View style={styles.buttonSize}>
                    <Button
                        color='#C2185b'
                        title="To Cart"
                        onPress={() => { dispatch(CartActions.addToCart(itemData.item)) }} /></View>
            </ProductItem>}

        />

    )
}

ProductOverview.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Cart" iconName='md-cart' onPress={() => {
                    navData.navigation.navigate('Cart')
                }} />
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer()
                }} />
            </HeaderButtons>
        )
    }
}

styles = StyleSheet.create({
    buttonSize: {
        width: '40%',
    },
})


export default ProductOverview
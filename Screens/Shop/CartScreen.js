import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Button, Alert, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from '../../Components/Shop/CartItem'
import { removeFromCart } from '../../Store/Actions/Cart'
import { addOrder } from '../../Store/Actions/Orders'


const CartScreen = props => {


    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const cartTotalAmount = useSelector(state => state.Cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for (const key in state.Cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.Cart.items[key].productTitle,
                productPrice: state.Cart.items[key].productPrice,
                quantity: state.Cart.items[key].quantity,
                sum: state.Cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1)
    })


    const orderHandler = () => {
        setIsLoading(false)
        Alert.alert('Thankyou!', 'Your order has been placed, Do visit us again :)', [{
            text: 'Okay', style: 'default', onPress: async () => {
                await dispatch(addOrder(cartItems, cartTotalAmount))
                setIsLoading(true)
            }
        }])
    }

    return (
        <View style={styles.screen} >
            <View style={styles.summary}><Text style={{ fontWeight: 'bold' }}>Total:
                <Text style={{ color: "#C2185b" }}>${Math.round(cartTotalAmount)}
                </Text>
            </Text>
                {isLoading ? <ActivityIndicator size="small" color="black" /> : <Button title="Order Now"
                    color="#F59426"
                    onPress={orderHandler}
                    disabled={cartItems.length === 0} />}
            </View>
            <View>
                <FlatList data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={itemData => <CartItem quantity={itemData.item.quantity}
                        itemTitle={itemData.item.productTitle}
                        amt={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(removeFromCart(itemData.item.productId))
                        }}
                    />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20

    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 7,
        height: 80,
        marginBottom: 20,
        shadowColor: 'black',
        shadowOpacity: 0.16,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 30
    }
})

export default CartScreen


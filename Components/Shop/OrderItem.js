import React, { useState } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'



const OrderItem = props => {

    const [showDetails, setShowDetails] = useState(false)

    const orders = useSelector(state => state.Order.order)
    return (
        <View style={styles.orderitem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmt}>${Math.round(props.amount)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button style={{ width: '60%' }} title={showDetails ? "Hide Details" : "View Details"} color="#C2185b" onPress={() => {
                setShowDetails(prevState => !prevState)
            }} />
            {showDetails && <View style={styles.detailItems}>
                {props.items.map(
                    cartItems => <CartItem
                        key={cartItems.productId}
                        quantity={cartItems.quantity}
                        amt={cartItems.sum}
                        itemTitle={cartItems.productTitle} />
                )}
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    orderitem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'

    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmt: {
        fontWeight: 'bold',
        fontSize: 16
    },
    date: {
        fontSize: 14,
        color: '#888'
    },
    detailItems: {
        width: '100%',

    }
})

export default OrderItem
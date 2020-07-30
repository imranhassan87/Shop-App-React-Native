import React, {useState , useEffect} from 'react'
import {FlatList, ActivityIndicator, View, Text} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../Components/UI/HeaderButton'
import OrderItem from '../../Components/Shop/OrderItem'
import * as OrderActions from '../../Store/Actions/Orders'


const OrdersScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const orders = useSelector(state => state.Order.order)
    const dispatch = useDispatch()
    useEffect(() => {
        setIsLoading(true)
        dispatch(OrderActions.fetchOrder()).then(() => {
            setIsLoading(false)
        })
    },[dispatch])

    if(isLoading){
        return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color="black" />
        </View>
    }
    if(orders.length === 0){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>No orders found!</Text>
        </View>
    }

    return (
        <FlatList data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <OrderItem amount={itemData.item.totalAmt}
                date={itemData.item.readableDate}
                items={itemData.item.items}
            />} />
    )
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer()
                }} />
            </HeaderButtons>
        )
    }
}



export default OrdersScreen
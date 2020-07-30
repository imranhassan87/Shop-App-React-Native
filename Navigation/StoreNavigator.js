import React from 'react'
import { View, SafeAreaView, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'

import ProductOverview from '../Screens/Shop/ProductOverview'
import ProductDetailScreen from '../Screens/Shop/ProductDetailScreen'
import CartScreen from '../Screens/Shop/CartScreen'
import OrdersScreen from '../Screens/Shop/OrdersScreen'
import UserProductsScreen from '../Screens/User/UserProductsScreen'
import EditProductScreen from '../Screens/User/EditProductScreen'
import AuthScreen from '../Screens/User/AuthScreen'
import * as authActions from '../Store/Actions/auth'



const homeNavigator = createStackNavigator({
    OverView: ProductOverview,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name="md-cart" color={drawerConfig.tintColor} size={23} />
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#C2185b'
        },
        headerTintColor: '#f5f5f5'
    }
})

const orderNavigator = createStackNavigator({
    Order: OrdersScreen
}, {

    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name="md-list" color={drawerConfig.tintColor} size={23} />
    },

    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#C2185b'
        },
        headerTintColor: '#f5f5f5'
    }
})

const adminNavigator = createStackNavigator({
    User: UserProductsScreen,
    Edit: EditProductScreen
}, {

    navigationOptions: { drawerIcon: drawerConfig => <Ionicons name="md-create" size={23} color={drawerConfig.tintColor} /> },

    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#C2185b'
        },
        headerTintColor: '#f5f5f5'
    }
})

const ShopNavigator = createDrawerNavigator({
    Products: homeNavigator,
    Orders: orderNavigator,
    Admin: adminNavigator
}, {
    contentOptions: {
        activeTintColor: 'orange'
    },
    contentComponent: props => {
        const dispatch = useDispatch()
        return <View style={styles.buttonContainer}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} >
                <DrawerItems {...props} />
                <TouchableOpacity
                    style={styles.submit2}
                    onPress={() => {
                        dispatch(authActions.logout())
                        props.navigation.navigate('Auth')
                    }}
                    underlayColor='#fff'>
                    <Text style={styles.submitText}>Logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    }
})

const authNavigator = createStackNavigator({
    authScreen: AuthScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#C2185b',
        },
        headerTintColor: '#f5f5f5'
    }
})

const mainNavigator = createSwitchNavigator({
    Auth: authNavigator,
    Shop: ShopNavigator
})


const styles = StyleSheet.create({
    submitText: {
        color: 'black',
        textAlign: 'justify',
        fontWeight: 'bold',

    },
    submit2: {
        marginHorizontal: 60,
        marginVertical: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 2,
    },
    buttonContainer: {
        flex: 1,
        paddingTop: 7,
        marginTop: 10,
    },
})

export default createAppContainer(mainNavigator)
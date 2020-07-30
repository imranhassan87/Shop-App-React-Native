import React from 'react'
import { FlatList, View, Button, StyleSheet, Alert, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../Components/Shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../Components/UI/HeaderButton'
import * as ProductsActions from '../../Store/Actions/Products'

const UserProductsScreen = props => {

    const userProduct = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()
    const editProductHandler = id => {
        props.navigation.navigate('Edit', { pId: id })
    }

    const deleteHandler = (id) => {
        Alert.alert('Are You Sure?', 'Do you really want to delete this item',
            [{ text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', 
                onPress: () => {dispatch(ProductsActions.deleteItems(id))}
            }])
    }

    if(userProduct.length === 0){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>No products found!</Text>
            <Text>Maybe start adding some :)</Text>
        </View>
    }

    return (
        <FlatList data={userProduct}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}>
                <View style={styles.buttonSize}>
                    <Button
                        color='skyblue'
                        title="Edit Item"
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }} /></View>
                <View style={styles.buttonSize}>
                    <Button
                        color='#EC5656'
                        title="Delete"
                        onPress={() => {deleteHandler(itemData.item.id)}} /></View>
            </ProductItem>}
        />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Edit Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="menu" iconName="md-menu" onPress={() =>
                    navData.navigation.toggleDrawer()
                } />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Edit" iconName="md-create" onPress={() =>
                    navData.navigation.navigate('Edit')
                } />
            </HeaderButtons>
        )
    }
}

styles = StyleSheet.create({
    buttonSize: {
        width: '40%',
    },
})

export default UserProductsScreen
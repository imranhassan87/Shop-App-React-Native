import { DELETE_ITEMS, ADD_ITEM, UPDATE_ITEM, SET_ITEM } from '../Actions/Products'
import Product from '../../Models/Product'


const initailState = {
    availableProducts: [],
    userProducts: []
}

export default (state = initailState, action) => {

    switch (action.type) {

        case SET_ITEM:
            return {
                availableProducts: action.items,
                userProducts: action.userItems
            }

        case ADD_ITEM:
            const newItem = new Product(
                action.productData.id,
                action.productData.ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            )
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newItem),
                userProducts: state.userProducts.concat(newItem)
            }


        case UPDATE_ITEM:
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid)
            const updateProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
            )

            const updatedUserProduct = [...state.userProducts]
            updatedUserProduct[productIndex] = updateProduct

            const availableProductsIndex = state.availableProducts.findIndex(prod => prod.id === action.pid)
            const updateAvailabeProduct = [...state.availableProducts]
            updateAvailabeProduct[availableProductsIndex] = updateProduct

            return {
                ...state,
                userProducts: updatedUserProduct,
                availableProducts: updateAvailabeProduct
            }

        case DELETE_ITEMS:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.pid),
                availableProducts: state.availableProducts.filter(product => product.id !== action.pid),
            }

    }
    return state
}
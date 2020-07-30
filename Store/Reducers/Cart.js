import { ADD_TO_CART, REMOVE_FROM_CART } from "../Actions/Cart"
import CartItem from "../../Models/cart-item"
import { ADD_ORDER } from "../Actions/Orders"
import { DELETE_ITEMS } from "../Actions/Products"


const initialState = {
  items: {},
  totalAmount: 0
}

export default (state = initialState, action) => {

  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.product
      const prodPrice = addedProduct.price
      const prodTitle = addedProduct.title

      if (state.items[addedProduct.id]) {
        const updatedProduct = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        )
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedProduct },
          totalAmount: state.totalAmount + prodPrice
        }
      }
      else {
        const newProduct = new CartItem(1, prodPrice, prodTitle, prodPrice)
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newProduct },
          totalAmount: state.totalAmount + prodPrice
        }
      }
    }
    case REMOVE_FROM_CART:
      let updatedCartItems
      const selectedCartItem = state.items[action.pid]
      const currentQuantity = selectedCartItem.quantity

      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        )
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }
      }
      else {
        updatedCartItems = { ...state.items }
        delete updatedCartItems[action.pid]
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      }
      case ADD_ORDER:
        return initialState;
      case DELETE_ITEMS:
        if (!state.items[action.pid]) {
          return state;
        }
        const updatedItems = { ...state.items };
        const itemTotal = state.items[action.pid].sum;
        delete updatedItems[action.pid];
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - itemTotal
        };
    }
  return state;
}

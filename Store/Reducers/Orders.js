import { ADD_ORDER, SET_ORDER } from "../Actions/Orders"
import OrderItems from "../../Models/orderItem"

const initialState = {
    order: []
}

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_ORDER:
            return {
                order: action.orders
            }

        case ADD_ORDER:
            const newOrder = new OrderItems(
                action.orderInfo.id,
                action.orderInfo.items,
                action.orderInfo.amount,
                action.orderInfo.date
            )
            return {
                ...state,
                order: state.order.concat(newOrder)
            }

    }
    return state
}
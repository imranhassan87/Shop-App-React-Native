import OrderItems from "../../Models/orderItem"

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDER = 'SET_ORDER'


export const fetchOrder = () => {

    return async (dispatch,getState) => {
        const userId = getState().Auth.userId
        try {
            
            const response = await fetch(`https://e-commerce-4576d.firebaseio.com/orders/${userId}.json`)

            if (!response.ok) {
                throw new Error('Something went wrong, please try again later')
            }

            const responseData = await response.json()
            const loadOrders = []

            for (const key in responseData) {
                loadOrders.push(new OrderItems(
                    key,
                    responseData[key].cartItems,
                    responseData[key].totalAmount,
                    new Date(responseData[key].date)
                ))
            }

            dispatch({
                type: 'SET_ORDER', orders: loadOrders
            })

        } catch (err) {
            throw err
        }


    }
}



export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const token = getState().Auth.token
        const userId = getState().Auth.userId
        const date = new Date()
        const response = await fetch(`https://e-commerce-4576d.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        })
        if (!response.ok) {
            throw new Error('Sorry! Something went wrong')
        }

        const responseData = await response.json()

        dispatch({ type: ADD_ORDER, orderInfo: { id: responseData.name, items: cartItems, amount: totalAmount, date: date } })
    }
}
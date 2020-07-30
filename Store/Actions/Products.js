import Product from "../../Models/Product";

export const DELETE_ITEMS = 'DELETE_ITEMS';
export const ADD_ITEM = 'ADD_ITEM'
export const UPDATE_ITEM = 'UPDATE_ITEM'
export const SET_ITEM = 'SET_ITEM'


export const fetchItem = () => {
  return async (dispatch,getState) => {
    const userId = getState().Auth.userId
    try {
      const response = await fetch('https://e-commerce-4576d.firebaseio.com/products.json')

      if (!response.ok) {
        throw new Error('Something went wrong, please try again later')
      }

      const responseData = await response.json()
      const loadedItems = []

      for (const key in responseData) {
        loadedItems.push(new Product(
          key,
          responseData[key].ownerId,
          responseData[key].title,
          responseData[key].imageUrl,
          responseData[key].description,
          responseData[key].price,
        ))
      }

      dispatch({
        type: SET_ITEM,
        items: loadedItems,
        userItems: loadedItems.filter(prod => prod.ownerId === userId) 
      })
    } catch (err) {
      throw err
    }
  }
}


export const deleteItems = productId => {
  return async (dispatch,getState) => {
    const token = getState().Auth.token
    const response = await fetch(`https://e-commerce-4576d.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Sorry! Something went wrong.')
    }

    dispatch({ type: DELETE_ITEMS, pid: productId });
  }
};


export const addItem = (title, imageUrl, description, price) => {
  return async (dispatch, getState) => {
    const userId = getState().Auth.userId
    const token = getState().Auth.token
    const response = await fetch(`https://e-commerce-4576d.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      })
    });

    const responseData = await response.json()

    console.log(responseData)

    dispatch({
      type: ADD_ITEM, productData: {
        id: responseData.name,
        title,
        imageUrl,
        description,
        price
      }
    })
  }
}


export const updateItem = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().Auth.token
    //console.log(getState())
    const response = await fetch(`https://e-commerce-4576d.firebaseio.com/products/${id}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        imageUrl,
        description
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    dispatch({
      type: UPDATE_ITEM, pid: id, productData: {
        title,
        imageUrl,
        description,
      }
    })
  }
}

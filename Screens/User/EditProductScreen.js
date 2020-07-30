import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { StyleSheet, View, ScrollView, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../Components/UI/HeaderButton'
import Input from '../../Components/UI/Input'
import * as ProductsActions from '../../Store/Actions/Products'


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const updateInput = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedInputValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedInputValidation = {
            ...state.inputValidation,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedInputValidation) {
            updatedFormIsValid = updatedFormIsValid && updatedInputValidation[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidation: updatedInputValidation,
            inputValues: updatedInputValues,
        }
    }
    return state
}

const EditProductScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const dispatch = useDispatch()


    const prodId = props.navigation.getParam('pId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const [formState, dispatchFormState] = useReducer(updateInput,
        {
            inputValues: {
                title: editedProduct ? editedProduct.title : '',
                imageUrl: editedProduct ? editedProduct.imageUrl : '',
                price: '',
                description: editedProduct ? editedProduct.description : ''
            },
            inputValidation: {
                title: editedProduct ? true : false,
                imageUrl: editedProduct ? true : false,
                price: editedProduct ? true : false,
                description: editedProduct ? true : false
            },
            formIsValid: editedProduct ? true : false
        })


    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error, [{ text: 'OK' }])
        }
    }, [error])

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }]);
            return;
        }
        setError(null)
        setIsLoading(true)

        try {

            if (editedProduct) {
                await dispatch(ProductsActions.updateItem(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.imageUrl,
                    formState.inputValues.description))
            }
            else {
                await dispatch(ProductsActions.addItem(
                    formState.inputValues.title,
                    formState.inputValues.imageUrl,
                    formState.inputValues.description,
                    +formState.inputValues.price
                ))
            }
            props.navigation.goBack()
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)

    }, [dispatch, prodId, formState])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    if (isLoading) {
        return <View style={styles.activity}>
            <ActivityIndicator size="large" color="black" />
        </View>
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id="title"
                        label='Title'
                        errorText="Please enter a valid title!"
                        keyboardType="default"
                        autoCorrect
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required

                    />
                    <Input
                        id="imageUrl"
                        label='Image Url'
                        errorText="Please enter a image url!"
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : (
                        <Input
                            id="price"
                            label='Price'
                            errorText="Please enter a price!"
                            keyboardType="decimal-pad"
                            onInputChange={inputChangeHandler}
                            returnKeyType="next"
                            required
                            min={0.1}
                        />
                    )}
                    <Input
                        id="description"
                        label='Description'
                        errorText="Please enter a valid description!"
                        keyboardType="default"
                        onInputChange={inputChangeHandler}
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('pId') ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="submit" iconName="md-checkmark" onPress={submitFn} />
            </HeaderButtons>
        )
    }
}

export default EditProductScreen
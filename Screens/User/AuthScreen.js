import React, { useState, useReducer, useCallback, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'

import Input from '../../Components/UI/Input'
import * as authActions from '../../Store/Actions/auth'


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


const AuthScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [isSignup, setIsSignup] = useState(false)

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(updateInput,
        {
            inputValues: {
                email: '',
                password: ''
            },
            inputValidation: {
                email: false,
                password: false
            },
            formIsValid: false
        })

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])



    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occured!', error, [{ text: 'Okay' }])
        }
    }, [error])

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop')
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };


    return (
        <LinearGradient colors={['#EC5656', '#56AFEC', '#C356EC',]} style={{ flex: 1 }}>
            <KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={30} >
                <View style={styles.card}>
                    <ScrollView>
                        <View style={styles.inputContainer}>
                            <Input
                                id="email"
                                label="E-mail"
                                keyboardType="email-address"
                                required
                                email
                                autoCapitalize="none"
                                errorText="Please enter a valid e-mail!"
                                onInputChange={inputChangeHandler}
                                initialValue="" />

                            <Input
                                id='password'
                                label="Password"
                                keyboardType="default"
                                required
                                autoCapitalize="none"
                                secureTextEntry={true}
                                minLength={5}
                                errorText="Please enter a valid password!"
                                onInputChange={inputChangeHandler}
                                initialValue="" />
                        </View>

                        <View style={styles.buttonContainer}>
                            {isLoading ? <ActivityIndicator size="small" color="black" /> : <TouchableOpacity
                                style={styles.submit1}
                                onPress={authHandler}
                                underlayColor='#fff'>
                                <Text style={styles.submitText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
                            </TouchableOpacity>}
                            {/* <Button title="Login" color="#42C240" onPress={() => {
                                dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password))
                            }} /> */}
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.submit2}
                                onPress={() => { setIsSignup(prevState => !prevState) }}
                                underlayColor='#fff'>
                                <Text style={styles.submitText}>{`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Login'
};

const styles = StyleSheet.create({

    screen: {
        flex: 1,
    },
    card: {
        height: '60%',
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 7,
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 5,
        backgroundColor: "white",
        marginHorizontal: 35,
        marginVertical: 70,
    },
    buttonContainer: {
        paddingTop: 7,
        marginTop: 5,
    },
    inputContainer: {
        paddingTop: 5,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    submit1: {
        marginHorizontal: 50,
        marginVertical: 1,
        padding: 10,
        backgroundColor: "#42C240",
        borderRadius: 20,
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    },
    submit2: {
        marginHorizontal: 50,
        marginVertical: 1,
        padding: 10,
        backgroundColor: '#68a0cf',
        borderRadius: 20,
    },
})

export default AuthScreen
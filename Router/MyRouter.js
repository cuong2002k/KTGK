import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../Screen/Login';
import Register from '../Screen/Register';
import TodoApp from '../Screen/TodoApp';
import { createStackNavigator } from '@react-navigation/stack';
import { useMycontextProvider } from '../Store';
const Stack = createStackNavigator();
const MyRouter = () => {

    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name='TodoApp' component={TodoApp}


            />
        </Stack.Navigator>
        // name define 
    )
}

export default MyRouter

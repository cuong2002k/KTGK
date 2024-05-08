import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from 'react'
import { auth } from "../Database/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Button, HelperText, TextInput, IconButton } from "react-native-paper";
import { LoginAccount, useMycontextProvider } from "../Store";
const Login = ({ navigation }) => {
    const [email, onChangeEmail] = React.useState("cuong2002k@gmail.com");
    const [password, onChangePassword] = React.useState("123456789");
    const [showButton, setShowButton] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(true);
    const [controller, dispatch] = useMycontextProvider();
    const { userLogin } = controller;
    const HandleLogin = () => {
        LoginAccount(dispatch, email, password);
    }

    useEffect(() => {
        if (userLogin != null) navigation.navigate("TodoApp")

    }, [userLogin])

    useEffect(() => {
        setShowButton(!(email.includes('@') && password.length > 6));
    }, [email, password])


    const hasEmailErrors = () => {
        return !email.includes('@');
    };
    const hasPasswordError = () => {
        return password.length < 6;
    }
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>
            <View>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => onChangeEmail(text)}
                    style={styles.input}
                />
                <HelperText type="error" visible={hasEmailErrors()}>
                    Email address is invalid!
                </HelperText>
            </View>
            <View>
                <TextInput
                    mode="flat"
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => onChangePassword(text)}
                    style={styles.input}
                    right={
                        <TextInput.Icon
                            icon={showPassword ? "eye" : "eye-off"}
                            onPress={() => setShowPassword(!showPassword)}
                        />}
                    secureTextEntry={showPassword}
                />
                <HelperText type="error" visible={hasPasswordError()}>
                    Password must have at least 6 characters
                </HelperText>
            </View>
            <View>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <Text>Don't have an account ?</Text>
                    <Text
                        onPress={() => navigation.navigate("Register")}
                        style={{ color: "blue" }}
                    >Register</Text>
                </View>

            </View>
            <Button style={{ borderRadius: 0, backgroundColor: "blue", marginTop: 10 }}
                mode="contained"
                onPress={() => HandleLogin()}
                disabled={showButton}
            >Login</Button>

        </View>
    );
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ccc",
        justifyContent: "center",
        padding: 20
    },
    logo: {
        height: 140,
        width: 100,
        margin: 20
    },
    input: {
        backgroundColor: "white",
        marginTop: 10,
        marginBottom: 10
    },
    button: {
        padding: 10,
        margin: 10,
    }

});
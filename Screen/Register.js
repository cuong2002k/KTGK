import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { CreateAccount } from '../Store';
import { Button, HelperText, TextInput } from 'react-native-paper';

const Register = () => {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [fullName, onChangeFullName] = React.useState("");
    const [confirmPassword, onChangeconfirmPassword] = React.useState("");
    const [showButton, setShowButton] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(true);
    const HandleRegister = () => {
        CreateAccount(email, password, fullName);
    }

    const CheckName = () => {
        return fullName != "";
    }

    const CheckEmail = () => {
        return email.includes('@');
    }

    const CheckPassword = () => {
        return password.length > 6;
    }

    const CheckConfirmPassword = () => {
        return password == confirmPassword;
    }

    const checkInputValid = () => {
        return CheckName() && CheckEmail() && CheckPassword() && CheckConfirmPassword();
    }

    useEffect(() => {
        setShowButton(!checkInputValid())

    })

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>
            <View>
                <TextInput
                    mode="flat"
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={(text) => onChangeFullName(text)}
                    style={styles.input}
                />
                <HelperText type="error" visible={!CheckName()}>
                    Full Name is not null!
                </HelperText>
            </View>
            <View>
                <TextInput
                    mode="flat"
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => onChangeEmail(text)}
                    style={styles.input}
                />
                <HelperText type="error" visible={!CheckEmail()}>
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
                <HelperText type="error" visible={!CheckPassword()}>
                    Password must have at least 6 characters!
                </HelperText>
            </View>

            <View>
                <TextInput
                    mode="flat"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(text) => onChangeconfirmPassword(text)}
                    style={styles.input}
                    secureTextEntry={showPassword}
                />
                <HelperText type="error" visible={!CheckConfirmPassword()}>
                    Password not match!
                </HelperText>
            </View>
            <Button style={{ borderRadius: 0, backgroundColor: "blue", marginTop: 10 }}
                mode="contained"
                disabled={showButton}
                onPress={() => HandleRegister()}

            >Register</Button>

        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ccc",
        justifyContent: "center",
        padding: 20
    },
    logo: {
        width: 50,
        height: 70,
        margin: 10,
        resizeMode: "stretch"
    },
    input: {
        backgroundColor: "white",
        marginTop: 5,
        marginBottom: 5
    },


});
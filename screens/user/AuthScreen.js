import React from 'react';
import { Text, View, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, Button } from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

/**per iniziare dobbiamo andare alla schermata di navigazione e dire che questo è il primo componente di navigazione */

const AuthScreen = props => {

    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id='email'
                            label='E-Mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize="none"
                            errorMessage="Please enter a valid Email Address!"
                            onInputChange={() => { }}
                            initialValue=""
                        />

                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry //oscura il testo per non renderlo visibile
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorMessage="Please enter a valid Password!"
                            onInputChange={() => { }}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Login"
                                color={Colors.primary}
                                onPress={() => { }} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Switch to Sign Up"
                                color={Colors.sesto}
                                onPress={() => { }} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>

    );
}


AuthScreen.navigationOptions = {
    headerTitle: 'Login'
}


const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer:{
        marginTop:10,
        width:'100%',
        alignItems:'center'
    }

})

export default AuthScreen;
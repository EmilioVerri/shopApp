import React,{useEffect,useReducer,useCallback,useState} from 'react';
import { Text, View, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, Button,ActivityIndicator,Alert} from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth';

/**per iniziare dobbiamo andare alla schermata di navigazione e dire che questo è il primo componente di navigazione */


/**definiamo un reducer che riceve gli stati iniziali e li va a modificare*/

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;//se qualcosa va male restituisco l'ultimo stato salvato 
};




const AuthScreen = props => {
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState();

    /**Definiamo una useState che ci permette di capire se siamo in login mode o in signUp mode 
     * mettiamo lo useState a false per dirgli che siamo in modalità login
    */

    const[isSignUp,setIsSignUp]=useState(false);

    const dispatch=useDispatch();
/**dentro al componente inizializzo la reducer che si trova fuori
 * e come inputValues inizializzo email e password vuoti e come inputValidities li inizializzo a false e come formIsValid lo inizializzo a false
*/
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          email:'',
          password:''
        },
        inputValidities: {
          email:false,
          password:false
        },
        formIsValid: false
      });

      /**definisco una useEffects per la gestione dell'errore */

      useEffect(()=>{
          if(error){
              Alert.alert('An error Occured!',error,[{text:'Okay'}]);
          }
      },[error]);
     

      /**definiamo una variabile action undefined
       * se isSignUp è true:
       * gli dico che la variabile action è uguale alla funzione signUp con quegli elementi passati dentro l'azione auth
       * se isSignUp è false:
       * gli dico che la variabile action è uguale alla funzione login con quegli elementi passati dentro l'azione auth
       * 
       * all'esterno dell'if passo la variabile action alla dispatch così faccio sempre dispatch
       * 
      */
    const authHandler=async()=>{
        let action;
        if(isSignUp){
            action=
            authActions.signUp(
                formState.inputValues.email,
                formState.inputValues.password);
        }else{
            action=authActions.login(
                formState.inputValues.email,
                formState.inputValues.password);
        }
        setError(null);
        setIsLoading(true);

        try{
        await dispatch(action);
    }catch(err){
        setError(err.message);
    }

    setIsLoading(false);
        
        
    }

    const inputChangeHandler=useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },[dispatchFormState]
    )



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
                            errorText="Please enter a valid Email Address!"
                            onInputChange={inputChangeHandler}
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
                            errorText="Please enter a valid Password!"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading?(
                            <ActivityIndicator size='large' color={Colors.primary}/>):
                            (<Button
                                title={isSignUp?"SignUp":"Login"}
                                color={Colors.primary}
                                onPress={authHandler} />)}
                        </View>
                        <View style={styles.buttonContainer}>
                            {/**utilizzo i bac tick con switch in modo da ignettare un valore dinamico*/}
                            <Button
                                title={`Switch to ${isSignUp?'Login':'SignUp'}`}
                                color={Colors.sesto}
                                onPress={()=>{
                                    setIsSignUp(prevState=>!prevState);//ritorno il valore contrario al tocco dello stato precendete, se il prevState era true diventa false
                                }} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>

    );
}


AuthScreen.navigationOptions ={
    headerTitle: 'Autenticazione'
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
import React, { useReducer,useEffect} from 'react';//definisco useEffect
import { ScrollView, Text, View, StyleSheet, Platform, TextInput, Alert} from 'react-native';




/**
 * DEFINISCO AZIONE per fare una sfocatura dell'input quando è stato toccato:
 */
const INPUT_BLUR='INPUT_BLUR';

/**
 * DEFINISCO AZIONE per il cambio dell'input:
 */

const INPUT_CHANGE = 'INPUT_CHANGE';

/**
 * nella reducer di INPUT_CHANGE ritorno una copia dello stato, 
 * vado a prender value dalla dispatch() e la stessa cosa vale per isValid
 * li aggiorno per ogni sequenza di tasti dell'input di riferimento
 * 
 * 
 * ella reducer di INPUT_BLUR ritorno una copia dello stato, 
 * touched lo imposto a true
 */




const inputReducer = (state, action) => {
    switch (action.type) {
      case INPUT_CHANGE:
        return {
          ...state,
          value: action.value,
          isValid: action.isValid
        };
      case INPUT_BLUR:
        return {
          ...state,
          touched: true
        };
      default:
        return state;
    }
  };






const Input = props => {
    /**INPUT:

     * definisco 2 constanti uguali alla useReducer che ha dentro il reducer definito sopra e 
     * un oggetto che ha una value: controllo se è stato iniziato initialValue cioè ho già quell'elemento
     * se c'è già l'elemento allora lo stampo se siamo in create lo stampo vuoto
     * definisco isValid e verifico se è true o false
     * con touched controllo se è stato toccato e gli diciamo false per adesso
     */

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false
      });


/**
 * FACCIO DESTRUTTURAZIONE:
 * sulle props di onInputChange, quindi non bisognerà più scrivere props davanti ad esso
 * e lo facciamo anche su id
 */

const { onInputChange, id } = props;




/**USE EFFECTS:
 * 
 * faccio una if che controlla se inputState.touched è true allora è stato toccato ed esegue questa funzione
 * creo una funzione richiamata dal componente principale EditProductScreen
 * e lo inizializzerò con inputState.value ciè prendo value dentro useReducer
 * e lo inizializzo anche con inputState.isValid prende isValid dentro alla useReducer
 * gli mettiamo delle dipendenze alla useEffects:
 * inputState (quello generale) e la onInpuChange e id come dipendenza inserito dentro EditProductScreen
 * 
 * POI LO GESTIAMO NELLA EDITPRODUCTSCREEN
 */
useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
        /** definisco constante textChangeHandler e gli passo campo input text
        * faccio richiamo della dispatch dell'azione dichiarata sopra e gli passo l'oggetto type con l'azione definita sopra
        * dentro a value inserisco il text che ho creato nel campo di input,
        * dentro isValid gli inserisco isValid per vedere se è ancora true o se è false allora non è validato
        * 
        * definisco dei validatori:
        * const emailRegex ci permette di convalidare l'email
        * definisco una variabile isValid= true; poi la sfrutteremo per i controlli sotto:
        * 
        */
       const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       let isValid = true;
        //i validatori qua sotto ritornano false su isValid se non sono stato validati
        if (props.required && text.trim().length === 0) {
            isValid = false;
          }
          if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
          }
          if (props.min != null && +text < props.min) {
            isValid = false;
          }
          if (props.max != null && +text > props.max) {
            isValid = false;
          }
          if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
          }
          dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
        };

/**
 * lostFocusHandler:
 * faccio dispatch dell'azione sopra INPUT_BLUR
 */
const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };



  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}//inoltro tutti oggetti di scena che ottengo sul mio componente di input qui all'input di testo
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}//richiamo la textChangeHandler
        onBlur={lostFocusHandler}//richiamo la lostFocusHandler
            />
            {/*controllo anche se è stato toccato*/}
            {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
    formControl: {
      width: '100%'
    },
    label: {
      fontFamily: 'open-sans-bold',
      marginVertical: 8
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    },
    errorContainer: {
      marginVertical: 5
    },
    errorText: {
      fontFamily: 'open-sans',
      color: 'red',
      fontSize: 13
    }
  });
  
  export default Input;
  
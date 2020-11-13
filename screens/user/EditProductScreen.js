//la useReducer viene utilizzata quando ci sono molti stati molto simili tra di loro
import React, { useState, useEffect, useCallback, useReducer } from 'react';//usiamo useState per salvare l'input dell'utente
import { ScrollView, Text, View, StyleSheet, Platform, TextInput, Alert,KeyboardAvoidingView} from 'react-native';
//importo gli HeaderButton
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

//importo lo useSelector
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/products';

import Input from '../../components/UI/Input';


/**
 *creiamo un useReducer:
 si crea fuori dalla funzione principale.
 Prende uno stato e un azione , NON CENTRA NIENTE CON REDUX
 creiamo all'esterno un azione
 quando riceviamo un azione nel formReducer dobbiamo cambiare lo state:
 1)faccio update della Values definisco una constante updatedValues che è un oggetto che contiene:
 tutti gli stati iniziali dell'inputValues contenuti, va a richiamarlo dalla useReducer
 e voglio sostituire i valori che ci sono già con i valori inseriti nell'input
 diamo come chiave l'azione che viene chiamata e come valore il valore che viene passato da quella azione

 2) faccio update della Validities definendo una constante updatedValidities che restituisce un ogggetto che contiene:
 tutti gli stati iniziali dell'inputValidities contenuti, va a richiamarlo dalla useReducer
 e voglio sostituire i valori che ci sono già con i valori inseriti nell'input
 diamo come chiave l'azione che viene chiamata e come valore siccome è un boolean il valore true o false della isValid

 3)faccio update della formIsValid
definisco variabile formIsValid e la metto uguale a true
faccio ciclo for che cicla tutte le chiavi dentro updatedvalidities e se tutti i valori su updatedValidities è true allora anche questo ritorna true
se anche solo un elemento è falso ritorna false , esamina tutti i form per la key per la chiave  && serve per sovrascrivere ai valori vecchi i valori nuovi true ciclati per chiave
 
 ritorneremo un nuovo stato che sostituisce inputValues con la constante updatedValues e 
 sostituisce inputValidities con la constante updatedValidities

 e sostituisco la vecchia formIsValid con la nuova updatedFormIsValid


 */



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






const EditProductScreen = props => {
    /** EditProductScreen:
 * definisco useState per salvare i dati dell'utente
 * e creo tanti useState quanti i campi di input che ho fatto dentro alla return
 * se editProduct è presente (perchè viene passato id a questo componente che permette a editedproduct di esistere) siamo nella sezione modifica e quindi possiamo modificare il titolo, l'immagine, e la descrizione
 * il prezzo rimane invariato. Se invece la editedProduct non c'è allora siamo in aggiungi e fallo rimanere vuoto
 * 
 * definisco il richiamo dallo UserProductsScreen del productId dentro alla constante prodId
 * 
 * richiamo dal reducers passando per l'app.js con products che fa riferimento al reducers productsReducer che va a prendere le informazioni dentro userproducts
 * e fa una find che va a verificare che id che viene passato sia uguale a quello del prodotto
 * 
 * 
 * definisco la submitHandler che farà la submit dei prodotti inseriti dall'utente, per farlo userò una useEffects e una useCallBack(che deve stare attorno alla fuznione)
 * faccio una useEffects, come dipendenza avrà la submitHandler
 * all'interno della useEffects ci sarà:
 * una setParams in cui submit sarà la chiave della submitHandler,
 * quindi adesso possiamo richiamarlo dentro alla navigationOptions
 * 
*/


const prodId = props.navigation.getParam('productId');
const editedProduct = useSelector(state =>
  state.products.userProducts.find(prod => prod.id === prodId)
);
    /**
     * DEFINIAMO UNA USEREDUCER,
     * che è uguale ad una destrutturazione sulla formState e su dispatchFormState
     * si aggiorna con formState e dispatch permette di inviare l'azione
     * che richiama la reducer creata fuori questa funzione
     * e gli definiamo gli stati iniziali:
     * 1)inputValues: mettiamo title e gli diciamo che se c'è editedProduct allora il compo title sarà riempito senò sarà vuoto, 
     * faccio la stessa cosa per imageUrl,description per il prezzo lo inizializziamo vuoto
     * 
     * 2) inputValidities: se c'è editedProduct allora è valido e ritorno true senò non è validato e ritorno false
     * faccio la stessa cosa per imageUrl,description,price
     * 
     * 3)formIsValid: se c'è editedProduct allora è valido e ritorno true senò non è validato e ritorno false
     */

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          title: editedProduct ? editedProduct.title : '',
          imageUrl: editedProduct ? editedProduct.imageUrl : '',
          description: editedProduct ? editedProduct.description : '',
          price: ''
        },
        inputValidities: {
          title: editedProduct ? true : false,
          imageUrl: editedProduct ? true : false,
          description: editedProduct ? true : false,
          price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
      });





    /*TOGLIAMO GLI STATE PER LA USEREDUCER
    const[title,setTitle]=useState(editedProduct?editedProduct.title:'');
    const[imageUrl,setImageUrl]=useState(editedProduct?editedProduct.imageUrl:'');
    const[price,setPrice]=useState('');
    const[description,setDescription]=useState(editedProduct?editedProduct.description:'');
    
    */

    /**
     * definisco la dispatch per chiamare le azioni:
     * nella submitHandler se editProduct è vero siamo in modifica quindi:
     * 1)lanciamo un azione con la dispatch dentro all'azione productsActions richiamiamo updateProducts e gli passiamo id, title,description,imageUrl
     * nella submitHandler se editProduct è false siamo in aggiungi quindi:
     * 2)lanciamo un azione con la dispatch dentro all'azione productsActions richiamiamo createProducts e gli passiamo  title,description,imageUrl,price
     * e nel prezzo mettiamo un più per non fare generare un errore siccome è un numero e non una stringa
     * 
     * nella submitHandler dobbiamo specificare le dipendenze della useCallBack, saranno:
     * 1) dispatch / 2)prodId /3) title 4) description / 5) imageUrl / 6) price QUESTI SONO TUTTI GLI ELEMENTI CHE PASSO AD UN ACTIONS
     */
    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
          Alert.alert('Wrong input!', 'Please check the errors in the form.', [
            { text: 'Okay' }
          ]);
          return;
        }
        if (editedProduct) {
          dispatch(
            productsActions.updateProduct(
              prodId,
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl
            )
          );
        } else {
          dispatch(
            productsActions.createProduct(
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl,
              +formState.inputValues.price
            )
          );
        }
        props.navigation.goBack();
      }, [dispatch, prodId, formState]);

      useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
      }, [submitHandler]);


    /**
     * faccio questa funzione per verificare se il testo è stato validato
     * come campo di input metto il testo e inputIdentifier per verificare se si parla diun titolo o di un immagineUrl
     * definisco isValid=false;
     * così secontiene più di 0 caratteri senza contare spazi(trim) allora cambia isValid a true
     * definisco anche un nuovo useState per la validazione del titolo
     * richiamo l'azione definita sopra dispatchFormState e gli passo un oggetto per l'azione:
     * gli passo il type che è FORM_UPDATE definita sopra che è l'azione
     * e poi passo tutti gli altri dati che vado ad utilizzare
     * text, isValid (e dobbiamo fare sapere quale input ha innescato questo),
     * input:'title va a riprendere il valore definito dentro inputValues e la inputValidities//l'ho cambiata
     * inpu: metto identifier che lo utilizzo per verificare se si tratta di un titolo sia per imageUrl,price e description 
     * 
     * 
     * i valori adesso saranno inputIdentifier,inputValue che farà riferimento alla value della useEffect
     *  e inputValidity che farà riferimento alla isValid della useEffect 
     * quindi non abbiamo più bisogno della validazione sotto
     * 
     * sostituisco alla value e alla isValid lo informazioni qua sopra
     * 
     * avvolgo la inputChangeHandler con una useCallBack, in modo tale che questa funzione non venga utilizzata inutilmente
     * la useCallBack ha delle dipendenze:
     * l'unica che abbiamo è la dispatchFromState che si trova dove c'è la useReducer
     * 
     * 
     */

    /*TOGLIAMO GLI STATE PER LA USEREDUCER
    const[titleIsValid,setTitleIsValid]=useState(false);
    */



   const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
        /*let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }*/
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );

    /**RETURN:
     * nella return creiamo dei campi di testo di input e dentro ad essi l'utente inserirà le informazioni
     * per ogni campo di input gli diamo un value che è uguale a quello definito dentro agli useState
     * e nelle corrispettive onChangeText definiamo tutte le set
     * 
     * allora dove c'è price abbiamo definito:
     * che se editedProduct esiste (perchè viene passato id a questo componente che permette a editedproduct di esistere)
     * allora siamo nella sezione modifica e quindi non mostrare questo il campo price, perchè il prezzo sarà invariato. 
     * Se editedProduct invece non esiste mostra questo campo così che l'utente può modificarlo
     * 
     * utilizziamo per i campi di input le keyboardType e autoCapitalize e autoCorrect e returnKeyType
     * 
     * nella onChange faccio un bind sulla funzione e gli attribuisco un valore che sarà inputIdentifier
     * lo faccio sia per il titolo sia per imageUrl,price e description che sono i nomi che ho inserito nell'inputValues e inputValidities
     * 
     * dentro a value lo sostituiamo con il formState e gli attribuiamo per ognuno il valore dell'elemento
     */
    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"// AL POSTO DI FARE LA BIND PER TUTTI INSERISCO ID E LO RICHIAMO NELLA INPUT.JS
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
                    //deve ricevere 2 argomenti preso dalla useEffects
                    //onInputChange={inputChangeHandler.bind(this,'title')} RIMUOVO IL BIND PER COLPA USECALLBACK
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.title : ''}//se editedProduct è true allora initialValue sarà il titolo senò sarà vuoto
                    initiallyValid={!!editedProduct}//se non abbiamo prodotti modificati allora questo non può essere inizialmente valido quindi passo false
                    //lo inserisco per definire le validazioni:
                    required
                    />

                <Input
                id='imageUrl'// AL POSTO DI FARE LA BIND PER TUTTI INSERISCO ID E LO RICHIAMO NELLA INPUT.JS
                    label='Image Url'
                    errorText="Please enter a valid image url!"
                    keyboardType='default'
                    returnKeyType='next' 
                     //onInputChange={inputChangeHandler.bind(this,'price')} RIMUOVO IL BIND PER COLPA USECALLBACK
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct?editedProduct.imageUrl:''}//se editedProduct è true allora initialValue sarà il titolo senò sarà vuoto
                    initiallyValid={!!editedProduct}//se non abbiamo prodotti modificati allora questo non può essere inizialmente valido quindi passo false
                    //lo inserisco per definire le validazioni:
                    required
                    minLength={5}//minimo 5 caratteri
                    />

                {editedProduct ? null :
                    <Input
                    id='price' // AL POSTO DI FARE LA BIND PER TUTTI INSERISCO ID E LO RICHIAMO NELLA INPUT.JS
                        label='Price'
                        errorText="Please enter a valid price!"
                        keyboardType='decimal-pad'
                        returnKeyType='next' 
                         //onInputChange={inputChangeHandler.bind(this,'price')} RIMUOVO IL BIND PER COLPA USECALLBACK
                        onInputChange={inputChangeHandler}
                        //price non avrà l'initialValue
                        //lo inserisco per definire le validazioni:
                    required
                    min={0.1}//zero punto 1 è il numero più piccolo che dobbiamo inserire
                        />}

                <Input
                id='description'// AL POSTO DI FARE LA BIND PER TUTTI INSERISCO ID E LO RICHIAMO NELLA INPUT.JS
                    label='Description'
                    errorText="Please enter a valid description!"
                    keyboardType='default'
                    autoCapitalize='sentences'
                    autoCorrect
                    multiline
                    numberOfLines={3}
                     //onInputChange={inputChangeHandler.bind(this,'description')} RIMUOVO IL BIND PER COLPA USECALLBACK
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct?editedProduct.description:''}//se editedProduct è true allora initialValue sarà il titolo senò sarà vuoto
                    initiallyValid={!!editedProduct}//se non abbiamo prodotti modificati allora questo non può essere inizialmente valido quindi passo false
                    required
                    minLength={5}
                     />
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    );
}


EditProductScreen.navigationOptions = navData => {

    /**definisco una constante che ha una getParam che riprende la submit come chiave presa dalla useEffects */
    const submitFn = navData.navigation.getParam('submit');
    /**definiamo una navigationOptions e per rendere il titolo dinamico definiamo una getParam 
     * se dalla schermata UserproductsScreen clicchiamo e passiamo productId alla EditProduct allora il titolo sarà EditProduct senò 
     * se non viene passato nulla il titolo sarà Add Product
     * 
     * dentro la onPress richiamo la funzione submitFn definita qua sopra
    */
   return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};


const styles = StyleSheet.create({
    form: {
      margin: 20
    }
  });
  
  export default EditProductScreen;
  
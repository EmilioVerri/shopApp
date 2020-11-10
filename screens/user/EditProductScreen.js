import React,{useState,useEffect,useCallback} from 'react';//usiamo useState per salvare l'input dell'utente
import { ScrollView, Text, View, StyleSheet, Platform, TextInput,Alert} from 'react-native';
//importo gli HeaderButton
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

//importo lo useSelector
import {useSelector,useDispatch} from 'react-redux';
import * as productsActions from '../../store/actions/products';

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


const prodId=props.navigation.getParam('productId');

const editedProduct=useSelector(state=>state.products.userProducts.find(prod=>prod.id===prodId));



const[title,setTitle]=useState(editedProduct?editedProduct.title:'');
const[imageUrl,setImageUrl]=useState(editedProduct?editedProduct.imageUrl:'');
const[price,setPrice]=useState('');
const[description,setDescription]=useState(editedProduct?editedProduct.description:'');



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
const dispatch=useDispatch();

const submitHandler=useCallback(()=>{
    if(!titleIsValid){//se è false titleIsValid allora ritorno una return ed esce dal ciclo, non lo esegue e ritorna un alert
        Alert.alert('Wrong input!','Please check the errors in the form.',[{text:'Okay',}])
        return;
    }
    if(editedProduct){
        dispatch(productsActions.updateProduct(prodId,title, description, imageUrl));
    }
    else{
        dispatch(productsActions.createProduct(title,description,imageUrl,+price));
    }
    props.navigation.goBack();//torna alla schermata precedente
},[dispatch,prodId,title,description,imageUrl,price]);


useEffect(()=>{
props.navigation.setParams({submit:submitHandler})
},
[submitHandler])


/**
 * faccio questa funzione per verificare se il titolo è statovalidato
 * definisco anche un nuovo useState per la validazione del titolo
 * se il valore di text senza contare gli spazi (trim) è uguale a  zero
 * setto useState a false(non valido) senò setto lo useState a true(valido)
 * e infine setto la setTitle(text) con il valore passato
 */
const[titleIsValid,setTitleIsValid]=useState(false);


const titleChangeHandler=text=>{
    if(text.trim().legnth===0){
        setTitleIsValid(false);
    }else{
        setTitleIsValid(true);
    }
    setTitle(text);
}

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
 */
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                    style={styles.input} 
                    value={title} 
                    onChangeText={text=>setTitle(text)}
                    keyboardType='default'
                    autoCapitalize='sentences'
                    autoCorrect={false}
                    returnKeyType='next'/>
                    {!titleIsValid && <Text>Please enter a valid title!</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput 
                    style={styles.input} 
                    value={imageUrl} 
                    onChangeText={text=>setImageUrl(text)}
                    keyboardType='default'/>
                </View>
               {editedProduct?null: <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                    style={styles.input} 
                    value={price} 
                    onChangeText={text=>setPrice(text)}
                    keyboardType='decimal-pad'/>
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                    style={styles.input} 
                    value={description} 
                    onChangeText={text=>setDescription(text)}
                    keyboardType='default'/>
                </View>
            </View>
        </ScrollView>
    );
}


EditProductScreen.navigationOptions=navData=>{

    /**definisco una constante che ha una getParam che riprende la submit come chiave presa dalla useEffects */
    const submitFn=navData.navigation.getParam('submit');
    /**definiamo una navigationOptions e per rendere il titolo dinamico definiamo una getParam 
     * se dalla schermata UserproductsScreen clicchiamo e passiamo productId alla EditProduct allora il titolo sarà EditProduct senò 
     * se non viene passato nulla il titolo sarà Add Product
     * 
     * dentro la onPress richiamo la funzione submitFn definita qua sopra
    */
    return{
        headerTitle:navData.navigation.getParam('productId')?'Edit Product':'Add Product',
        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Save' iconName={Platform.OS==='android'?'md-checkmark':'ios-checkmark'} 
            onPress={submitFn}/>
        </HeaderButtons>
        )
    }
}


const styles = StyleSheet.create({
    form:{
        margin:20,
    },
    formControl:{
        width:'100%'
    },
    label:{
        fontFamily:'open-sans-bold',
        marginVertical:8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    }
})


export default EditProductScreen;
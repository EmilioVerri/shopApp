import { ADD_TO_CART,REMOVE_FROM_CART } from "../actions/cart";
import cartItem from '../../models/cart-item';
import CartItem from "../../models/cart-item";
import { ActionSheetIOS, Platform } from "react-native";
import { ADD_ORDER } from "../actions/order";

import { DELETE_PRODUCT } from "../actions/products";

const initialState={
    items:[],
    totalAmount:0
};

export default(state=initialState,action)=>{
    /**
     * FACCIO LO SWITCH SULLE AZIONI:
     * 1) case salvo nella constante addedProduct quello che c'è in product definito nell'azione, all'interno di esso ci sarà la descrizione del prodotto
     * definisco una constante prodPrice nella quale salvo il prezzo del prodotto al suo interno, faccio lo stesso per i titolo
     * 
     */
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct=action.product;
            const prodPrice=addedProduct.price;
            const prodTitle=addedProduct.title;

            /**
             * creo una variabile che farà da contenitore per tutti
             * 
             * CONDIZIONE IF:
             * se questo if restituisce qualcosa di vero, quindi c'è l'id del prodotto nel carrello e quindi voglio aggiornare il mio carrello
             * creo una variabile updateOrNewCarItem e gli dico che è uguale a una nuova CartItem della cart-item models
             * e nelle tonde lo popolo di dati
             * 1) argomento: riprendo l'id del prodotto aggiunto e gli prendo la quantità e mettiamo più 1 perchè stiamo aggiungendo lo stesso articolo che c'è già al carrello
             * 2) argomento:il prezzo del prodotto con la constante prodPrice
             * 3)argomento: il titolo del prodotto con la constante prodTitle
             * 4) argomento: riprendo il prodotto dell'id che viene passato al carrello e gli prendo sum e lo sommo con il prezzo alla somma corrente, quindi ogni volta aggiungerà il prezzo alla somma corrente
             * ritorniamo:il vecchio stato con gli elementi copiati, un nuovo oggetto dentro items con tutti i valori dell'array esistente più
             * una nuova chiave con le parentesi quadre addedproduct e la chiave sarà id. il valore della chiave di questo oggetto sarà: la variabile definita sopra updateOrNewCarItem
             *  mettiamo il totalAmount, nel momento in cui inseriamo un nuovo oggetto bisogna sommare il vecchio prezzo con quello nuovo
             * 
             * nell'ELSE dovrò aggiungere il nuovo articolo nel carrello
             * definisco una nuova constante uguale alla cartItem di cart-item il componente dentro a model
             * e al suo interno gli definisco i 4 campi di input del componente
             * e ritornerò tutti gli oggetti esistenti in aggiunta un nuovo oggetto dentro items con tutti i valori dell'array esistente più
             * una nuova chiave con le parentesi quadre in cui viene aggiunto il nome della chiave Prodotto
             * il cui valore sarà la constante definita sopra newCartItem
             * mettiamo il totalAmount, nel momento in cui inseriamo un nuovo oggetto bisogna sommare il vecchio prezzo con quello nuovo
             * 
             * ADESSO NELLA PRODUCTSOVERVIEWSCREEN e nella PRODUCTDETAILSCREEN gestisco l'azione 
             * 
             */

                let updateOrNewCarItem;


            if(state.items[addedProduct.id]){
                //already have the item in the cart
                updateOrNewCarItem= new CartItem(
                    state.items[addedProduct.id].quantity+1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum+ prodPrice
                );

                return{
                    ...state,
                    items:{...state.items,[addedProduct.id]:updateOrNewCarItem},
                    totalAmount:state.totalAmount+prodPrice

                }

            }else{
                updateOrNewCarItem=new CartItem(1,prodPrice,prodTitle,prodPrice);
                return {
                    ...state,
                    items:{...state.items,[addedProduct.id]:updateOrNewCarItem},
                    totalAmount:state.totalAmount+prodPrice
                }
            }
            /**
             * DEFINISCO NUOVO CASE NEL CASO DELLA REMOVE DAL CARRELLO
             * ricaviamo la quantità prendendo lo state e andando ad utilizzare il productId che gli viene passato nella actions,
             * troviamo così il prodotto tramite la pid definita nella actions che gli verrà passata
             * se la quantità di oggetti come quello sono più di uno, quando clicchiamo delete ne togliamo solo 1, non li togliamo tutti al carrello
             * IF
             * definisco constante updatedCart= nuovo CartItem e li voglio copiare i valori dell'esistente CartItem ma semplicemente ridurre la quantità
             * quindi come valore del CartItems gli passo l'azione pid che sarà un oggetto con salvati tutti i valori del Cartitem,
             * definisco una constante selectedcartItem con dentro le informazioni così posso utilizzarla quando voglio
             * faccio .quantity che va a riprendere la quantità dell'elemento passato e la diminuisce di 1
             * e poi passiamo gli altri elementi dell'oggetto, la somma dobbiamo diminuirla del prezzo del prodotto perchè diminuisce di 1 la quantità quindi va ridotta
             * definisco updatedCartItems come variabile fuori dall'IF
             * poi nella if dico che la variabile definita è uguale agli oggetti che c'erano prima e sostituisco l'oggetto passato con action.pid che è la chiave con updateCart
             * 
             * 
             * ELSE
             * quindi dobbiamo ritornare un nuovo oggetto items che contine quelli vecchi e non include più questo oggetto nel caso in cui questo oggetto sia solo 1
             * creo constante che fa la copia di tutti gli oggetti dentro items e con il valore delete che creo dopo, vado a cancellare dentro alla constante definita prima che copia gli items
             * quello che rispecchia il pid che gli ho passato dentro alla actions
             * 
             * 
             * 
             * ritorno una copia dello state, impostiamo items su updateCartItems
             * e il totale sarà uguale allo stato copiato sopra del totale meno il prezzo del action.pid che viene passato
             * DOPO DI QUESTO POSSO MANDARE L'AZIONE DAL CARTSCREEN
             */
        case REMOVE_FROM_CART:
            const selectedCartItem=state.items[action.pid];
            const currentQty=state.items[action.pid].quantity;
            let updatedCartItems;
            if(currentQty>1){
                const updatedCart=new CartItem(
                    selectedCartItem.quantity-1, 
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum-selectedCartItem.productPrice);
                    updatedCartItems={...state.items,[action.pid]:updatedCart}
            }else{
                updatedCartItems={...state.items};
                delete updatedCartItems[action.pid];
            }
            return{
                ...state,
                items:updatedCartItems,
                totalAmount:state.totalAmount-selectedCartItem.productPrice
            }
            /**QUANDO CLICCHIAMO SU ORDINA SE RITONO L'INITIALSTATE IL CARRELLO SI SVUOTERA */
            case ADD_ORDER:
                return initialState;


            /**
             * GESTISCO DELETE_PRODUCT CHE E' UN AZIONE DI PRODUCTS
             * 
             * definisco una if se so che il prodotto che l'ID che stiamo per eliminare non fa parte dell'elenco
             * allora ritorna uno state 
             * senò
             * definisco 3 constanti di cui una è una delete:
             * 1) la prima che contine tutti gli elementi items
             * 2) la seconda che contiene la somma degli elementi che hanno quell'id
             * 3) che è una delete che cancella la constante definita updateItems che contine tutti gli elementi con quell'id
             * 
             * 
             * ritorniamo lo stato che già abbiamo
             * dentro items:ritorniamo updateitems
             * e dentro totalAmount ritorniamo la somma totale meno la somma per l'elemento con l'id passato
             * 
             * 
             * adesso dobbiamo lanciare questa azione dentro USERPRODUCTSSCREEN
             */
            case DELETE_PRODUCT:
                if (!state.items[action.pid]) {
                  return state;
                }
                const updatedItems = { ...state.items };
                const itemTotal = state.items[action.pid].sum;
                delete updatedItems[action.pid];
                return {
                  ...state,
                  items: updatedItems,
                  totalAmount: state.totalAmount - itemTotal
                };
    }

            
    return state;
};
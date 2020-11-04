import { ADD_TO_CART } from "../actions/cart";
import cartItem from '../../models/cart-item';
import CartItem from "../../models/cart-item";
import { Platform } from "react-native";

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
    }
    return state;
};
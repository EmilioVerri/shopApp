//IMPORTO L'ARRAY DI PRODOTTI DENTRO dummy_data
import PRODUCTS from '../../data/dummy-data';

import {DELETE_PRODUCT} from '../actions/products';

/**
 * INITIAL STATE:
 * definiamo 2 array che li inizializziamo con PRODUCTS per adesso:
 * availableProducts AND 
 * userProducts che lo filtro per un ID proprietario per adesso
 * 
 */

 const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(prod=>prod.ownerId==='u1')
 }

 /**
  * RIDUTTORE, che è una funzione in cui otteniamo lo stato che dovrebbe essere inizializzato con il nostro initialState
  * e dove otteniamo un azione
  */
 export default(state=initialState,action)=>{
     switch(action.type){
         /**DELETE PRODUCT:
          * ritorno un nuovo oggetto, che copia lo stato iniziale esistente
          * userProduct riprende i vecchi prodotti utenti userProducts e facciamo una filter
          * fa una funzione su tutti gli elementi dell'array se ritorna true manteniamo quell'elemento mentre se ritorna false l'elemento viene cancellato
          * gli diciamo che se il prodotto che abbiamo non corrisponde con il prodotto che gli abbiamo passato allora vogliamo tenerlo, non vogliamo tenere il prodotto che gli abbiamo passato
          * la stessa cosa la gestiamo su availableProducts  
          * 
          * devo gestire la delete products anche dentro al carrello reducers
          */
         case DELETE_PRODUCT:
            return {
              ...state,
              userProducts: state.userProducts.filter(
                product => product.id !== action.pid
              ),
              availableProducts: state.availableProducts.filter(
                  product => product.id !== action.pid
                ),
            };
        }
     
     return state;
 };


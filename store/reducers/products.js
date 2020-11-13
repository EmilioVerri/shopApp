//IMPORTO L'ARRAY DI PRODOTTI DENTRO dummy_data
import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';

import {CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT,SET_PRODUCTS} from '../actions/products';

/**
 * INITIAL STATE:
 * definiamo 2 array che li inizializziamo con PRODUCTS per adesso:
 * availableProducts AND 
 * userProducts che lo filtro per un ID proprietario per adesso
 * 
 */

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
  };

 /**
  * RIDUTTORE, che è una funzione in cui otteniamo lo stato che dovrebbe essere inizializzato con il nostro initialState
  * e dove otteniamo un azione
  */
 export default (state = initialState, action) => {
    switch (action.type) {




         /**CREATE_PRODUCT:
          * nella create devo prima di tutto archiviare in una nuova constante la possibilità di richiamare tutti i valori contenuti dentro models products
          * e dovrà ricevere un id, un ownerid,un titolo, un immagine,una descrizione, un prezzo li passo dentro Product
          * ritorniamo una copia dello stato iniziale,
          * per availableProduct concateniamo newProduct e la stessa cosa la facciamo per userProduct
          */
         case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,//riprendiamo id definito per Firebase
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
        /**UPDATE_PRODUCT:
         * creo una constante productIndex= allo stato userProducts e utilizziamo findIndex(), che è una funzione che viene eseguita
         * su ogni elemento dell'array e che deve restituire true in modo da avere un indice e li cercherò gli ID uguali al mio pid
         * così memorizzo indice del prodotto selezionato dall'utente dentro productIndex
         * 
         * creiamo in seguito una constante updatedProduct uguale a una nuova serie di Product però già popolato di alcuni vecchi elementi
         * dentro ci passiamo l'id preso dall'azione, lo userProducts definito sopra e stampa solo indice del productIndex con ownerId(tutta questa terminologia vuole dire che l'utente non potrà fare update di questo sarà il valore che era già stato salvato con quell'indice)
         * farò la stessa cosa per tutti gli elementi che aveva indicato azione UPDATE_PRODUCT
         * (l'utente non potrà fare update di questo) vale per il prezzo sarà il valore che era già stato salvato con quell'indice
         * 
         * creo un altra constante updateUserProducts dove copio nell'array i prodotti che sono già esistenti
         * poi in seguito una volta trovato il prodotto selezionato che è uguale al prodotto aggiornato, quindi sostituisco il prodotto con questo indice
         * con il nuovo prodotto aggiornato nella mia copia
         * 
         * creo una constante availableProductIndex che ha la stessa funzione della productIndex
         * e faccio la stessa cosa di userProducts con availableProducts
         */
        case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
                /**
                 * RETURN:
                 * lo stato iniziale,
                 * ritorno l'updateAvailableProducts e la updateUserProducts così andrà a modificarli
                 * e poi andiamo a fare la dispatch nell'editProductScreen
                 */
                return {
                    ...state,
                    availableProducts: updatedAvailableProducts,
                    userProducts: updatedUserProducts
                  };
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
        )
      };

      case SET_PRODUCTS:

          return{
              /**
               * nella return torniamo availableProducts uguale alla products definita dentro dispatch dell'azione
               * per la userProducts invece ritorniamo anche qua la products filtrati per id ='u1'
               */
              availableProducts:action.products,
              userProducts:action.products.filter(prod=>prod.id==='u1')
          }

  }
  return state;
};

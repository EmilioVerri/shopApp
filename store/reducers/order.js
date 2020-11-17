
import {ADD_ORDER} from '../actions/order';
import Order from '../../models/order';


const initialState = {
    orders: []
  };

  export default (state = initialState, action) => {
    switch (action.type) {
        /**
         * CASE ADD_ORDER:
         * creo una constante che mi permette di creare un nuovo ordine di dummy-data
         * e new Date().toString() genera un oggetto javaScript che genera un ID univoco
         * richiamo items e amount definiti nella action
         * facciamo un new Data() che ritorna un timeStamp memorizzato in un oggetto javascript
         * 
         * nella return copio lo stato che c'era già, prendo la variabile definita nell'initialState orders
         * e gli attribuisco con concat() che è una funzione javascript che aggiunge un nuovo elemento all'array e restituisce un nuovo array
         * e dentro concat, concateno la constante  newOrder
         * 
         * adesso l'id non sarà più la data ma sarà un vero e proprio id preso dall'aztions e anche la data la riceviamo dalle actions
         */
        case ADD_ORDER:
            const newOrder = new Order(
              //new Date().toString(),
              action.orderData.id,
              action.orderData.items,
              action.orderData.amount,
              //new Date()
              action.orderData.date
            );
            return {
              ...state,
              orders: state.orders.concat(newOrder)
            };
        }
      
        return state;
      };
      
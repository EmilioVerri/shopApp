import Order from "../../models/order";

//definisco un azione per aggiungere gli ordini
export const ADD_ORDER = 'ADD_ORDER';


/**definisco  2 campi di input che verranno passati dentro a questa actions
 * con type andiamo a definire ADD_ORDER, mentre con orderData creiamo un oggetto con all'interno
 * i due campi di input definiti per questa azione
 * IN SEGUITO LA GESTIAMO NEL REDUCERS
*/

/**
 * Molto simile alla createProducts dentro alla actions products però nell'url mettiamo orders
 * sarà una post e mettiamo anche come valore dopo cartItems e totalAmount, date
 * 
 * dentro alla dispatch recupero l'id da resData e gli passo la constante date create sopra
 * 
 * adesso nel reducers posso cambiarlo perchè l'id non sarà più la data ma lo otterrò dalla resData
 */
export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date();
        const response = await fetch(
            'https://rn-shopapp-fb5e0.firebaseio.com/order/u1.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toString()
                })
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();


        dispatch({
            type: ADD_ORDER,
            orderData: { id: resData.name, items: cartItems, amount: totalAmount, date: date }
        });
    }
    /* return {
       type: ADD_ORDER,
       orderData: { items: cartItems, amount: totalAmount }
     };*/
};



/**definiamo una nuova azione per controllare che gli ordini sian passati 
 * definisco orders come loadedOrders
*/
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {

        try {
            const response = await fetch(
                'https://rn-shopapp-fb5e0.firebaseio.com/order/u1.json'
            );
            /**se ritorna un 200 e quindi si è connessi con il link sopra ritorna un 200=ok
             * se response.ok è falso allora restituisci la frase di errore e lo gestiamo dentro ProductsOverviewScreen
             * 
             * creiamo un nuovo ordine e lo pushiamo dentro alla loadOrders che è un array vuoto e gli passiamo la key che cicla su resData
             * cartItems per key, totalAmount per key, e la data per key.
             * dopo aver gestito questa try/catch andiamo a gestire la SET_ORDERS dentro al reducers di orders
             */
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedOrders = [];

            for (const key in resData) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date)
                    )
                );
            }
            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (err) {
            throw err;
        }
    }
};
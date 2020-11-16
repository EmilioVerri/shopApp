
//definisco un azione per aggiungere gli ordini
export const ADD_ORDER = 'ADD_ORDER';


/**definisco  2 campi di input che verranno passati dentro a questa actions
 * con type andiamo a definire ADD_ORDER, mentre con orderData creiamo un oggetto con all'interno
 * i due campi di input definiti per questa azione
 * IN SEGUITO LA GESTIAMO NEL REDUCERS
*/
export const addOrder = (cartItems, totalAmount) => {
    return {
      type: ADD_ORDER,
      orderData: { items: cartItems, amount: totalAmount }
    };
  };
  
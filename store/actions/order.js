
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
    return async dispatch=>{
        const date=new Date();
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
                date:date.toString()
              })
            }
          );
      
          if(!response.ok){
              throw new Error('Something went wrong!');
          }
          const resData = await response.json();
    
    
    dispatch({
            type: ADD_ORDER,
            orderData: {id:resData.name, items: cartItems, amount: totalAmount, date:date}
    });
}
   /* return {
      type: ADD_ORDER,
      orderData: { items: cartItems, amount: totalAmount }
    };*/
  };
  
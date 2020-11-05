/**definisco un azione per aggiungere prodotti al carrello
 * definisco type come chiave e gli passo come argomento product
 * dopo vado a gestirla nel reducers
*/
export const ADD_TO_CART='ADD_TO_CART';

export const addToCart=product=>{
    return{type:ADD_TO_CART,product:product}
}

/**definisco un azione per rimuovere i prodotti dal carrello
 * come input definisco la productId, rimuoveremo l'oggetto a seconda dell'id
 * dopo vado a gestirla nel reducers
*/
export const REMOVE_FROM_CART='REMOVE_FROM_CART';

export const removeFromCart=productId=>{
    return{type:REMOVE_FROM_CART,pid:productId}
}
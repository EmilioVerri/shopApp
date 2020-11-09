/**definisco un azione per la delete */

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};




/**CREO L'UPDATE E LA CREATE DI ACTIONS PER LA MODIFICA O AGGIORNAMENTO DEL PRODOTTO:
 * POI ANDIAMO A GESTIRLO NEL REDUCERS DI PRODUCTS
 */

export const CREATE_PRODUCT='CREATE_PRODUCT';

export const createProduct=(title,description,imageUrl,price)=>{
    return {type:CREATE_PRODUCT,productData:{
        title,
        description,
        imageUrl,
        price
    }}
}



export const UPDATE_PRODUCT='UPDATE_PRODUCT';


export const updateProduct=(id,title,description,imageUrl)=>{
    return {type:UPDATE_PRODUCT,
        pid:id,
        productData:{
        title,
        description,
        imageUrl
    }}
}
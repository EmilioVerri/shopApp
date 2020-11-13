/**definisco un azione per la delete */

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};




/**CREO L'UPDATE E LA CREATE DI ACTIONS PER LA MODIFICA O AGGIORNAMENTO DEL PRODOTTO:
 * POI ANDIAMO A GESTIRLO NEL REDUCERS DI PRODUCTS
 */

export const CREATE_PRODUCT='CREATE_PRODUCT';
/**
 * INVECE CHE RESTITUIRE UN AZIONE:
 * ritorniamo un altra funzione grazie a Redux Thunk
 * è una funzione che riceve la funzione di invio come argomento e di sua volta deve inviare un azione
 * quindi grazie alla dispatch non restituisco più questa azione ma la spedisco
 * prima di spedire l'azione che manterrà comunque lo stesso funzionamento posso scrivere del codice asincrono e se ne occuperà Redux Thunk
 * quindi possiamo mandare una richiesta http e possiamo usare in react native l'api di recupero
 *  prende la fetch() un url al suo interno per inviare la richiesta ed è l'url su firebase e possiamo aggiungere un elemento dopo url che creerà quella parte nel DB ebisogna aggiungere .json
 *ha un secondo metodo la fetch() nel quale bisogna specificare il tipo di richiesta, definiamo una POST 
 *aggiungiamo anche l'intestazione del tipo di contenuto e il valore è 'application/json'
 *aggiungiamo anche un body per questa richiesta mettiamo il formato json e utilizziamo lo stringify per trasformare un array o un oggetto js in formato JSON quindi in una stringa
 lo stringify è un oggetto che contiene: title,description,imageUrl,pric, fireBase genererà un id per noi
 *con .then() otteniamo la risposta in modo da lavorarci
 inserendo async prima di dispatch posso archiviare la mia fetch dentro una constante è come usare then() ma in modo più facile restituisce una promessa
 await response.json(); ci ritornerà i dati di fireBase quando aggiungiamo un prodotto



 */
export const createProduct=(title,description,imageUrl,price)=>{
    return async dispatch=>{

       const response= fetch('https://rn-shopapp-fb5e0.firebaseio.com/products.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });

        const resData= await response.json();
        console.log(resData);


        dispatch({type:CREATE_PRODUCT,productData:{
            id:resData.name, //inviamo id del prodotto a fireBase quindi in products Reducer adesso possiamo passare id
            title,
            description,
            imageUrl,
            price
        }})

    }
    

   /* return {type:CREATE_PRODUCT,productData:{
        title,
        description,
        imageUrl,
        price
    }}*/
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
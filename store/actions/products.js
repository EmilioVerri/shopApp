//richiamo la Product per creare un nuovo prodotto
import Product from '../../models/product';


export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
      // any async code you want!
      //mettiamo tutto il codice dentro ad una try così possiamo gestire gli errori
      try {
        const response = await fetch(
          'https://rn-shopapp-fb5e0.firebaseio.com/products.json'
        );
/**se ritorna un 200 e quindi si è connessi con il link sopra ritorna un 200=ok
 * se response.ok è falso allora restituisci la frase di errore e lo gestiamo dentro ProductsOverviewScreen
 */
if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  const resData = await response.json();
  const loadedProducts = [];

  for (const key in resData) {
    loadedProducts.push(
      new Product(
        key,
        'u1',
        resData[key].title,
        resData[key].imageUrl,
        resData[key].description,
        resData[key].price
      )
    );
  }

  dispatch({ type: SET_PRODUCTS, products: loadedProducts });
} catch (err) {
  // send to custom analytics server
  throw err;
}
};
};




/**definisco un azione per la delete */

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

/**per a delete facciamo la più o meno la stessa cosa dell'update
 * gestisco anche qua la delete per id utilizzando back-tips Alt+96
 * per l'eliminazione il metodo sarà DELETE e non avremo bisogno di una header e di una body
 */
 /**aggiungiamo il token all' url si fa aggiungengo : auth=${}  e dentro mettiamo la constante token definita sotto
 * definiamo una funzione getState che ci da accesso allo stato Redux quindi adesso possiamo accedere allo stato
 * corrente del nostro negozio Redux e al token
 * salviamo dentro la constante token il token preso da getState che va a prenderlo dentro alla reducer auth e prende la variabile token
*/
export const deleteProduct = productId => {
    return async (dispatch,getState) => {
        const token=getState().auth.token;
      const response = await fetch(
        `https://rn-shopapp-fb5e0.firebaseio.com/products/${productId}.json?auth=${token}`,
        {
          method: 'DELETE'
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      dispatch({ type: DELETE_PRODUCT, pid: productId });
    };
  };




/**CREO L'UPDATE E LA CREATE DI ACTIONS PER LA MODIFICA O AGGIORNAMENTO DEL PRODOTTO:
 * POI ANDIAMO A GESTIRLO NEL REDUCERS DI PRODUCTS
 */

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
/**
 * VA A SALVARE L'ELEMENTO CREATO NEL DB
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
https://rn-shopapp-fb5e0.firebaseio.com/products.json
 */

 /**aggiungiamo il token all' url si fa aggiungengo : auth=${}  e dentro mettiamo la constante token definita sotto
 * definiamo una funzione getState che ci da accesso allo stato Redux quindi adesso possiamo accedere allo stato
 * corrente del nostro negozio Redux e al token
 * salviamo dentro la constante token il token preso da getState che va a prenderlo dentro alla reducer auth e prende la variabile token
*/
export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch,getState) => {
        const token=getState().auth.token;
      // any async code you want!
      const response = await fetch(
          `https://rn-shopapp-fb5e0.firebaseio.com/products.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price
          })
        }
      );
  
      const resData = await response.json();


      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: resData.name, //inviamo id del prodotto a fireBase quindi in products Reducer adesso possiamo passare id
          title,
          description,
          imageUrl,
          price
        }
      });
    };
  



    /* return {type:CREATE_PRODUCT,productData:{
         title,
         description,
         imageUrl,
         price
     }}*/
}



export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
/**per azione di update dobbiamo passare l'elemento dell'update al db
 * utilizziamo i back-tips per la modifica del prodotto a secondo dell'id selezionato dall'utente
 * per fare i back-tips Alt+96 per aggiornare gli passiamo la PUT O LA PATCH
 */

/**aggiungiamo il token all' url si fa aggiungengo : auth=${}  e dentro mettiamo la constante token definita sotto
 * definiamo una funzione getState che ci da accesso allo stato Redux quindi adesso possiamo accedere allo stato
 * corrente del nostro negozio Redux e al token
 * salviamo dentro la constante token il token preso da getState che va a prenderlo dentro alla reducer auth e prende la variabile token
*/
export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch,getState) => {
        const token=getState().auth.token;
      const response = await fetch(
          
        `https://rn-shopapp-fb5e0.firebaseio.com/products/${id}.json?auth=${token}`,
        {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title,
              description,
              imageUrl
            })
          }
        );
        if (!response.ok) {
            throw new Error('Something went wrong!');
          }
      
          dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
              title,
              description,
              imageUrl
            }
          });
        };

        
      
   /* return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
            title,
            description,
            imageUrl
        }
    };*/



/**
 * DEFINISCO UNA NUOVA AZIONE:
 * e definisco un creatore di azioni  fetchProducts
 * non ha bisogno di argomenti restituisce una funzione che contine la fuznione di dispatch come argomento
 * 
 * all'interno faccio una dispatch che  contiene degli oggetti dove:
 * type è SET_PRODUCTS e products è un array popolato da loadedProduct
 * poi copiamo quello che ho fatto per la create
 * poi questa sarà un chiamata GET e non POST, non dobbiamo settare nessun headers e body
 * inviamo semplicemente una richiesta di recupero
 * 
 * definisco una constante  loadedProduct che è un array vuoto
 * definisco un ciclo for che cicla tutti gli oggetti e prende la chiave per ognuno di essi su resData e poi aggiungo ogni prodotto al mio loadedProduct
 * aggiungerò con la push un nuovo prodotto
 * come id: avrà la key
 * come owner id:'u1'
 * 
 * 
 * 
 * IN SEGUITO LO GESTISCO NEL REDUCERS
 * 
 */

};
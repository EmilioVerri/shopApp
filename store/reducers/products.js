//IMPORTO L'ARRAY DI PRODOTTI DENTRO dummy_data
import PRODUCTS from '../../data/dummy-data';

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
     return state;//per adesso ritorno lo stato iniziale
 };


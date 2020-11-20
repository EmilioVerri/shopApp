import AsyncStorage from "@react-native-community/async-storage";

/**
 * definisco azione SIGNUP

 NON SERVE PIU'
export const SIGNUP = 'SIGNUP';

 */
/**definisco una constante signUP che ha come valori di input la funzione email e password
 * all'interno di essa ritorna come async la dispatch e questo ci permette di utilizzare l'attesa asincrona prima di lanciare l'azione
 * definiamo una fetch che copiamo dentro il valore preso dal sito: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password 
nella sezione:iscriviti con email e password
verra mandata qua la richiesta http:
https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] 
[API_KEY] la troviamo in impostazione progetto dentro FireBase
mettiamo come metodo post, mettiamo header e il body nel body passiamo gli lementi che ci sono definiti nella sezione: iscriviti con email e password/Carico utile del corpo della richiesta

 * 
*/

export const signUp = (email, password) => {
    return async dispatch => {
        const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_hYkin1ENafPR0Qd8AfNUo9nDfhBLx6U',
                {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      email: email,
                      password: password,
                      returnSecureToken: true
                    })
                  }
                );
            if (!response.ok) {//se la risposta non è un 200
                const errorResData = await response.json();//estraggo l'errore in una constante ottenuto con una risposta JSON //ritornerà un 400
                /**definisco una constante errorId uguale alla constante definita sopra e .error ci da l'accesso al valore dell'errore restituito da FireBase
                 * esempio: EMAIL_EXISTS  ECC... .message prende il messaggio e poi gestiamo la constante nell'if sotto
                 * ilmessaggio di errore verrà passato alla AuthScreen
                 */
                const errorId = errorResData.error.message;
                let message = 'Something went wrong!';
                if (errorId === 'EMAIL_EXISTS') {
                  message = 'This email exists already!';
                }
                throw new Error(message);
              }
          
              const resData = await response.json(); //aspetta che ci sia una risposta json e lo convertirà in formato JavaScript
            console.log(resData);

            /**
             * nella dispatch definisco i valori che verranno mandati alla reducers:
             * il type, il token uguale a resData.idToken guardo la sezione Payload di risposta di https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
             * e la stessa cosa per id, ci sono .idToken e .localId
             */

            /*dispatch({
                type: SIGNUP,
                token:resData.idToken,
                userId:resData.localId
                NON CI SARA' PIù QUESTO MA CI SARA':
                })*/
                dispatch(authenticate(resData.localId, resData.idToken));//qua si sarà richiamo azione
            /*salviamo i dati sul dispositivo dopo la login dentro alla variabile saveDataToStorage
            dobbiamo dire quando il token scadrà perchè tutti i token hanno una scadenza,
            creiamo una constante expirationDate uguale ad una nuova data con funzione getTime()otteniamo il timestamp corrente
            e sommiamo expiresIn che è una quantità di secondi, siccome è una stringa dobbiamo convertirla a numero con il parseInt() e lo moltiplico per 1000
            faccio un nuovo newDate all'esterno per convertirlo in un oggetto data timestamp concreto
            expirationDate dobbiamo dopo passarlo alla saveDataToStorage*/
            const expirationDate = new Date(
                new Date().getTime() + parseInt(resData.expiresIn) * 1000
              );
              saveDataToStorage(resData.idToken, resData.localId, expirationDate);
            };
          };






/**
 * definisco azione LOGIN
 * 
 NON SERVE PIU':

export const LOGIN = 'LOGIN';

 */

/**definisco una constante login che ha come valori di input la funzione email e password
 * all'interno di essa ritorna come async la dispatch e questo ci permette di utilizzare l'attesa asincrona prima di lanciare l'azione
 * definiamo una fetch che copiamo dentro il valore preso dal sito: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password 
nella sezione:accedi con email e password
verra mandata qua la richiesta http:
https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] 
[API_KEY] la troviamo in impostazione progetto dentro FireBase
mettiamo come metodo post, mettiamo header e il body nel body passiamo gli lementi che ci sono definiti nella sezione: accedi con email e password/Carico utile del corpo della richiesta

 * 
*/

export const login = (email, password) => {
    return async dispatch => {
      const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_hYkin1ENafPR0Qd8AfNUo9nDfhBLx6U',
                {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      email: email,
                      password: password,
                      returnSecureToken: true
                    })
                  }
                );
            if (!response.ok) {//se la risposta non è un 200
                const errorResData = await response.json();//estraggo l'errore in una constante ottenuto con una risposta JSON //ritornerà un 400
                /**definisco una constante errorId uguale alla constante definita sopra e .error ci da l'accesso al valore dell'errore restituito da FireBase
                 * esempio: EMAIL_NOT_FOUND, INVALID_PASSWORD ECC... .message prende il messaggio e poi gestiamo la constante nell'if sotto
                 * ilmessaggio di errore verrà passato alla AuthScreen
                 */
                const errorId = errorResData.error.message;
                let message = 'Something went wrong!';
                if (errorId === 'EMAIL_NOT_FOUND') {
                  message = 'This email could not be found!';
                } else if (errorId === 'INVALID_PASSWORD') {
                  message = 'This password is not valid!';
                }
                throw new Error(message);
              }

              const resData = await response.json(); //aspetta che ci sia una risposta json e lo convertirà in formato JavaScript
            console.log(resData);

            /**
             * nella dispatch definisco i valori che verranno mandati alla reducers:
             * il type, il token uguale a resData.idToken guardo la sezione Payload di risposta di https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
             * e la stessa cosa per id, ci sono .idToken e .localId
             */

             /*dispatch({
                type: SIGNUP,
                token:resData.idToken,
                userId:resData.localId
                NON CI SARA' PIù QUESTO MA CI SARA':
                })*/
                dispatch(authenticate(resData.localId, resData.idToken)); //qua si sarà richiamo azione


            /*salviamo i dati sul dispositivo dopo la login dentro alla variabile saveDataToStorage
            dobbiamo dire quando il token scadrà perchè tutti i token hanno una scadenza,
            creiamo una constante expirationDate uguale ad una nuova data con funzione getTime()otteniamo il timestamp corrente
            e sommiamo expiresIn che è una quantità di secondi, siccome è una stringa dobbiamo convertirla a numero con il parseInt() e lo moltiplico per 1000
            faccio un nuovo newDate all'esterno per convertirlo in un oggetto data timestamp concreto
            expirationDate dobbiamo dopo passarlo alla saveDataToStorage*/
            const expirationDate = new Date(
                new Date().getTime() + parseInt(resData.expiresIn) * 1000
              );
              saveDataToStorage(resData.idToken, resData.localId, expirationDate);
            };
          };


/**
 * Aggiungo una nuova funzione saveDataToStorage:
 * che riceve in ingresso il token e userId
 * adesso andiamo ad utilizzare AsyncStorage per settare un Item
 * gli definiamo all'item una chiave=userData
 * il secondo valore è una stringa dove salvo li i dati, utilizziamo JSON.stringify per convertire un oggetto JavaScript in una stringa
 * e l'oggetto che converto è un oggetto che contine il token e userId salviamo questo oggetto come stringa sul dispositivo
 * gli passo expirationDate e lo definisco anche dentro allo stringify
 * toIOSString() convertirà questo elemento da una stringa ad un formato che standard dentro allo stringify
 */

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
      })
    );
  };
  




/**nuova azione authenticate,
 * che prende lo userId e il token e li uso per modificare i miei dati in Redux
 */
export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};




//aggiungo identificatore di azioni:
export const LOGOUT='LOGOUT';


/**aggiungo un nuovo creatore di azioni per la logout
 * 
 */
 export const logout=()=>{
     return{type:LOGOUT}
 }

/**
 * definisco azione SIGNUP
 */
export const SIGNUP = 'SIGNUP';
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
    return (
        async dispatch => {
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
            )
            if (!response.ok) {//se la risposta non è un 200
                const errorResData=await response.json();//estraggo l'errore in una constante ottenuto con una risposta JSON //ritornerà un 400
                /**definisco una constante errorId uguale alla constante definita sopra e .error ci da l'accesso al valore dell'errore restituito da FireBase
                 * esempio: EMAIL_EXISTS  ECC... .message prende il messaggio e poi gestiamo la constante nell'if sotto
                 * ilmessaggio di errore verrà passato alla AuthScreen
                 */
                const errorId=errorResData.error.message;
                let message ="Something went wrong!";

                if(errorId==='EMAIL_EXISTS'){
                    message='This email exists already!';
                }
                throw new Error(message);
            }

            const resData = await response.json(); //aspetta che ci sia una risposta json e lo convertirà in formato JavaScript
            console.log(resData);


            dispatch({
                type: SIGNUP,
            })
        }
    )
}






/**
 * definisco azione LOGIN
 */
export const LOGIN = 'LOGIN';

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
    return (
        async dispatch => {
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
            )
            if (!response.ok) {//se la risposta non è un 200
                const errorResData=await response.json();//estraggo l'errore in una constante ottenuto con una risposta JSON //ritornerà un 400
                /**definisco una constante errorId uguale alla constante definita sopra e .error ci da l'accesso al valore dell'errore restituito da FireBase
                 * esempio: EMAIL_NOT_FOUND, INVALID_PASSWORD ECC... .message prende il messaggio e poi gestiamo la constante nell'if sotto
                 * ilmessaggio di errore verrà passato alla AuthScreen
                 */
                const errorId=errorResData.error.message;
                let message ="Something went wrong!";

                if(errorId==='EMAIL_NOT_FOUND'){
                    message='This email coult not be found!';
                }
                else if(errorId==='INVALID_PASSWORD'){
                    message='This password is not valid!';
                }
                throw new Error(message);
            }

            const resData = await response.json(); //aspetta che ci sia una risposta json e lo convertirà in formato JavaScript
            console.log(resData);


            dispatch({
                type: LOGIN,
            })
        }
    )
}
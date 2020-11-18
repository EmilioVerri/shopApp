
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
           const response =await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_hYkin1ENafPR0Qd8AfNUo9nDfhBLx6U',
                {
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        email:email,
                        password:password,
                        returnSecureToken:true
                    })
                }
            )
            if(!response){
                throw new Error('Something went wrong!');
            }

            const resData=await response.json(); //aspetta che ci sia una risposta json e lo convertirà in formato JavaScript
            console.log(resData);


            dispatch({
                type: SIGNUP,
            })
        }
    )
}
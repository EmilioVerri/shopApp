import { AUTHENTICATE, LOGIN, SIGNUP } from '../actions/auth';



const initialState = {
    token: null,
    userId: null
};



export default (state = initialState, action) => {
    switch (action.type) {
        /**
        * case LOGIN:
        * 
        */
        /* case LOGIN:
             return{
                 token:action.token,
                 userId:action.userId
             };*/


        /**
         * case SIGNUP:
         * 
         */
        /*case SIGNUP:
            return{
                token:action.token,
                userId:action.userId
            };
            
            CI SARA' UN COMPONENTE UNICO:*/

        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId
            };



        default:
            return state;
    }
};

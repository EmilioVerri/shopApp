import { AUTHENTICATE, LOGIN, SIGNUP,LOGOUT} from '../actions/auth';



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
        
        case LOGOUT:
            return{
                token:initialState,
                userId:initialState
            }



        default:
            return state;
    }
};

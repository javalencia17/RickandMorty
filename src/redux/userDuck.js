import { loginWithGoogle, signOutGoogle } from '../firebase'
import { retrieveFavs } from './charsDuck'  
//constants
let initialData = {
    loggedIn: false,
    fetching: false
}
let LOGIN = "LOGIN"
let LOGIN_SUCCESS = "LOGIN_SUCCESS"
let LOGIN_ERROR = "LOGIN_ERROR"

let LOGIN_OUT = 'LOGIN_OUT'


//reducers
export default function reducer(state = initialData, action){
    switch (action.type) {
        case LOGIN_OUT:
            return { ...initialData }
        case LOGIN_SUCCESS:
            return { ...state, fetching: false, ...action.payload, loggedIn: true }
        case LOGIN_ERROR:
            return { ...state, fetching: false, error: action.payload}
        case LOGIN:
            return {...state, fetching: true};
        default:
            return state;
    }
}


//aux

const saveStorage = (storage) => {
 localStorage.storage = JSON.stringify(storage)
}

//actions 

export const restoreSessionAction = () => (dispatch, getState) => {
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    if(storage && storage.User){
        dispatch({
            type: LOGIN_SUCCESS,
            payload: storage.user
        })
    }
    
}


export const logOutAction = () => (dispatch, getState) => {
    signOutGoogle()

    dispatch({
        type: LOGIN_OUT
    })
    localStorage.removeItem('storage')

}


export const DoGoogleLogionAction = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN
    })
    return loginWithGoogle()
        .then(user => {
            console.log(user, 'usuario que me devuelve firebase')
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoUrl: user.photoUrl
                }
            })
            saveStorage(getState())
            retrieveFavs()(dispatch, getState)
        })
        .catch( err =>  {
            console.log(err)
            dispatch({
                type: LOGIN_ERROR,
                payload: err.messsge
            })
        })
}
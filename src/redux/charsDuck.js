
import axios from 'axios'
import { updateDB, getFavs } from '../firebase'

let inicialData = {
    fetching: false,
    array: [],
    current: {},
    favorites: []
}

let URL = "https://rickandmortyapi.com/api/character"

//constants
let GET_CHARACTER = "GET_CHARACTERS"
let GET_CHARACTER_SUCCESS = "GET_CHARACTER_SUCCESS"
let GET_CHARACTER_ERROR = "GET_CHARACTER_ERROR"
let REMOVE_CHARACTER = "REMOVE_CHARACTER"
let ADD_FAVORITES = "ADD_FAVORITES"
let GET_FAVS = "GET_FAVS"
let GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS"
let GET_FAVS_ERROR = "GET_FAVS_ERROR"





//reducers
export default function reducer(state = inicialData, action) {
    switch (action.type) {
        case GET_FAVS_ERROR:
            return {...state, fetching:false, error: action.payload}
        case GET_FAVS_SUCCESS:
            return {...state, fetching:false, favorites: action.payload}
        case GET_FAVS:
            return { ...state, fetching:true}
        case ADD_FAVORITES:
            return {...state, ...action.payload}
        case REMOVE_CHARACTER:
            return { ...state, array: action.payload }
        case GET_CHARACTER:
            return { ...state, fetching: true }
        case GET_CHARACTER_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_CHARACTER_SUCCESS:
            return { ...state, array: action.payload, fetching: false }
        default:
            return state;
    }
}


//actions (thunk)

export const retrieveFavs = () => (dispatch, getState) => {

    dispatch({
        type: GET_FAVS
    })

    let {uid} = getState().User 
    return getFavs(uid)
    .then(array => {
        dispatch({
            type: GET_FAVS_SUCCESS,
            payload: [...array]
        })
    })
    .catch(e=>{
        console.log(e)
        dispatch({
            type: GET_FAVS_ERROR,
            payload: e.message
        })
    })

}

export const addToFavoritesAction = () => (dispatch, getState) =>  {
    let { array, favorites } = getState().Chars
    console.log(getState())
    let { uid } = getState().User
    let char = array.shift()
    favorites.push(char)
    console.log('fav', favorites)
    console.log('uid', uid)

    updateDB(favorites, uid)
    dispatch({
        type:ADD_FAVORITES,
        payload: {array: [...array], favorites:[...favorites]}
    })    
}

export const removeCharacterActions = () => (dispatch, getState) => {
    let { array } = getState().Chars
    array.shift()
    dispatch({
        type: REMOVE_CHARACTER,
        payload: [...array]
    })
}

export const getCharacterActions = () => (dispatch, getState) => {
    dispatch({
        type: GET_CHARACTER
    })
    return axios.get(URL)
        .then(res => {
            dispatch({
                type: GET_CHARACTER_SUCCESS,
                payload: res.data.results
            })
        })
        .catch(err => {
            console.log('err', err)
            dispatch({
                type: GET_CHARACTER_ERROR,
                payload: err.response.message
            })
        })
}


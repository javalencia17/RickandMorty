import { createStore, combineReducers, applyMiddleware } from 'redux'
import UserReducer, {restoreSessionAction} from './userDuck'
import CharsReducer, { getCharacterActions } from './charsDuck'
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    User: UserReducer,
    Chars: CharsReducer

})

export default function generateStore  ()  {
    let store = createStore(rootReducer, applyMiddleware(thunk))
    getCharacterActions()(store.dispatch, store.getState)
    restoreSessionAction()(store.dispatch)
    return store
}
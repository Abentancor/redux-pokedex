import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import pokesReducer from './pokesDucks'
import usuarioReducer, { leerUsuarioActivo }  from './usuariosDucks'

const rootReducer = combineReducers({
    pokemones: pokesReducer,
    usuario:usuarioReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    leerUsuarioActivo()(store.dispatch)
    return store
}
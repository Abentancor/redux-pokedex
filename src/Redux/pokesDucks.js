import axios from "axios"


//constants

const dataInicial = {
    count:0,
    next:null,
    preious:null,
    results:[]
}
const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'
const NEXT_POKE_SUCCESS = 'NEXT_POKE_SUCCESS'
const PREV_POKE_SUCCESS = 'PREV_POKE_SUCCESS'
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'



//reducers

export default function pokesReducer(state = dataInicial, action){
    switch(action.type){
        case GET_POKE_SUCCESS:
            return {...state, ...action.payload}
        case NEXT_POKE_SUCCESS:
            return {...state, ...action.payload}
        case PREV_POKE_SUCCESS:
            return{...state, ...action.payload}
        case POKE_INFO_EXITO:
            return {...state, unPokemon: action.payload}
        default:
            return state

    }
}


//actions
export const obtenerPokemonsAction = () => async (dispatch, getState) => {

    if(localStorage.getItem("offset=0")){
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: JSON.parse(localStorage.getItem("offset=0"))
        })
        return
    }

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=offset&limit=21`)
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: res.data,
        })
        localStorage.setItem("offset=0", JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}


export const siguientePokemonesAccion = () => async(dispatch, getState)=>{

   
    const {next} = getState().pokemones

    if(localStorage.getItem(next)){
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return
    }

    try {
        const res = await axios.get(next)
        dispatch({
            type:NEXT_POKE_SUCCESS,
            payload: res.data
        })
        localStorage.setItem(next, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const prevPokemonesAccion = () => async(dispatch, getState)=>{

   
    const {previous} = getState().pokemones

    
    if(localStorage.getItem(previous)){
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return
    }

    try {
        const res = await axios.get(previous)
        dispatch({
            type:PREV_POKE_SUCCESS,
            payload: res.data,
            
        })
        localStorage.setItem(previous, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const unPokeDetalleAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch) => {

    if(localStorage.getItem(url)){

        dispatch({
            type: POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })

        return
    }

    try {
       const res = await axios.get(url) 
    //    console.log(res.data)
       dispatch({
           type: POKE_INFO_EXITO,
           payload: {
               nombre: res.data.name,
               ancho: res.data.weight,
               alto: res.data.height,
               foto: res.data.sprites.front_default
           }
       })
       localStorage.setItem(url, JSON.stringify({
            nombre: res.data.name,
            ancho: res.data.weight,
            alto: res.data.height,
            foto: res.data.sprites.front_default
        }))
    } catch (error) {
        console.log(error)
    }

}
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth, } from "../../firebase"

const dataInicial = {
    loading:false,
    activo:false
}

//types

const LOADING = "LOADING"
const USUARIO_ERROR ="USUARIO_ERROR"
const USUARIO_EXITO ="USUARIO_EXITO"
const CERRAR_SESION = "CERRAR_SESION"

//reducer
export default function usuarioReducer (state= dataInicial, action){
    switch(action.type){
        case LOADING:
            return{...state, loading:true}
            case USUARIO_ERROR:
                return{...state}
        case USUARIO_EXITO:
            return{...state, loading:false, user: action.payload, activo:true}
        case CERRAR_SESION:
            return{...dataInicial, activo:false}
        default:
            return{...state}
    }
}



//action

export const ingresoUsuarioAccion = () => async(dispatch)=>{

    
    try {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider)
        console.log(res)
        dispatch({
            type: USUARIO_EXITO,
            payload: {
                uid: res.user.uid,
                email: res.user.email
        }})
            localStorage.setItem('usuario: ', JSON.stringify({
                uid: res.user.uid,
                email: res.user.email
    }))
        
    } catch (error) {
        
    }
}

export const leerUsuarioActivo = ()=>(dispatch)=>{
    if(localStorage.getItem('usuario')){
        dispatch({
            type:USUARIO_EXITO,
            payload:JSON.parse(localStorage.getItem('usuario'))
        })
    }

}

export const cerrarSesionUsuario = () => async (dispatch) => {
    console.log('cerrarSesionUsuario called')
    await signOut(auth)
    console.log('signOut executed')
    localStorage.removeItem('usuario')
    console.log('localStorage removed')
    dispatch({
        type: CERRAR_SESION
    })
    console.log('usuario salio')
}
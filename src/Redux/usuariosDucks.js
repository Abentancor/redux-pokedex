import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth, db} from "../../firebase"
import { collection, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
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
    const res = await signInWithPopup(auth, provider);

    const usuario = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
    };
      localStorage.setItem('usuario', JSON.stringify({
            uid: res.user.uid,
            email: res.user.email
    }))
    
    const usuarioDB = await getDoc(doc(collection(db, 'usuarios'), usuario.email));

    if (usuarioDB.exists()) {
      dispatch({
        type:USUARIO_EXITO,
        payload: usuarioDB.data()
      })
      localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
    }else{
      await setDoc(doc(collection(db, 'usuarios'), usuario.email), usuario);
      dispatch({
        type: USUARIO_EXITO,
        payload: usuario,
      });
      localStorage.setItem('usuario', JSON.stringify(usuario))
      console.log('usuario creado')
    }
        
    } catch (error) {
        console.log(error, 'error')
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
    await signOut(auth)
    localStorage.removeItem('usuario')
    dispatch({
        type: CERRAR_SESION
    })
    console.log('usuario salio')
}


export const actualizarUsuarioNombreAccion = (nombreActualizado) => async(dispatch, getState)=>{
  dispatch({
    type:LOADING,
  })
  const {user} = getState().usuario


  try {
    await updateDoc(doc(collection(db, 'usuarios'), user.email), {displayName: nombreActualizado})

    const usuario = {
      ...user,
      displayName:nombreActualizado
    }

    dispatch({
      type:USUARIO_EXITO,
      payload: usuario
    })

    localStorage.setItem('usuario', JSON.stringify(usuario))
  
  } catch(error){
    console.log(error)
  }
}
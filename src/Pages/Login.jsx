import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ingresoUsuarioAccion } from '../Redux/usuariosDucks'

const Login = () => {

  const dispatch =useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(store=>store.usuario.loading) 
  const activo = useSelector(store=>store.usuario.activo)

  useEffect(()=>{
 
      if(activo){
        navigate('/')
      }
  }, [activo])
  

  return (
    <div className='w-1/2 text-center  mt-36 m-auto'>
    <h3 className='text-2xl mb-8'>Acceder con Google</h3>
    <button className='px-3 py-1 m-2 bg-rose-600  text-white rounded-lg' disabled={loading} onClick={()=>dispatch(ingresoUsuarioAccion())}>Accerder</button>
    </div> 
  )
}

export default Login
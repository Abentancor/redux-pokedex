import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actualizarUsuarioNombreAccion } from '../Redux/usuariosDucks'

const Perfil = () => {

  const usuario = useSelector(store => store.usuario.user)
  const loading = useSelector(store => store.usuario.loading)

  const dispatch = useDispatch()


  const [nombreUsuario, setNombreUsuario] = useState(usuario.displayName)
  const [activarFormulario, setActivarFormulario] = useState(false)

  const actulizarUsuarioNombre = () =>{
    if(!nombreUsuario.trim()){
      console.log('nombre')
      return
    }
    dispatch(actualizarUsuarioNombreAccion(nombreUsuario))
    setActivarFormulario(false)
  } 


  return (
    <div className='w-fit p-6 m-auto bg-slate-400 mt-36 grid text-center justify-items-center font-medium'>
      <img className='rounded-full border-4 border-sky-700 mb-6 ' src={usuario.photoURL} />
      <h3 className='text-xl mb-2'>{usuario.displayName}</h3>
      <p className='text-gray-600 mb-4'>Email: {usuario.email} </p>
      <button className='px-3 py-1 mb-2 bg-rose-600  text-white rounded-lg' onClick={()=>setActivarFormulario(true)}>Editar nombre</button>
      {
        loading && <div className="flex items-center justify-center my-8">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-rose-600 motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
          >
        </div>
      </div>
      }
      {
        activarFormulario &&
        <form >
          <input 
            type="text" 
            value={nombreUsuario}
            onChange={e => setNombreUsuario(e.target.value)}
            className='rounded-lg px-3 py-1 ' />
          <button onClick={() => actulizarUsuarioNombre() }  className='px-3 py-1 mb-2 bg-rose-600  text-white rounded-lg ml-2'>Actualizar</button>
        </form>
      }
    </div>
  )
}

export default Perfil
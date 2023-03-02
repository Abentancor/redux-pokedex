import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actualizarUsuarioFotoAccion, actualizarUsuarioNombreAccion } from '../Redux/usuariosDucks'

const Perfil = () => {

  const usuario = useSelector(store => store.usuario.user)
  const loading = useSelector(store => store.usuario.loading)

  const dispatch = useDispatch()


  const [nombreUsuario, setNombreUsuario] = useState(usuario.displayName)
  const [activarFormulario, setActivarFormulario] = useState(false)
  const [error, setError] = useState(false)

  const actulizarUsuarioNombre = () =>{
    if(!nombreUsuario.trim()){
      console.log('nombre')
      return
    }
    dispatch(actualizarUsuarioNombreAccion(nombreUsuario))
    setActivarFormulario(false)
  } 

  const seleccionarArchivo = imagen =>{
    console.log(imagen.target.files[0])
    const imagenCliente = imagen.target.files[0]

    if(imagenCliente === undefined){
      console.log('imagen no seleccionada')
      return
    }

    if(imagenCliente.type === "image/png" || imagenCliente.type === "image/jpg" || imagenCliente.type === "image/jpeg"){
      dispatch(actualizarUsuarioFotoAccion(imagenCliente))


      setError(false)
    }
    else{
      setError(true)
    }
  }

  return (
    <div className='w-fit p-6 m-auto  mt-36 grid text-center justify-items-center font-medium '>
      <div className='relative  mb-6'>
          <img className='rounded-full border-4 w-44 h-44 border-sky-700 ' src={usuario.photoURL} />
          <input 
          type="file"
          className='font-bold absolute top-0 right-0 left-0 bottom-0 rounded-full opacity-0 cursor-pointer '
          onChange={e => seleccionarArchivo(e)}
          />
      </div>
      {
        error && 
        <p className=' bg-rose-700 text-white my-4'>
          Archivo no valido
        </p>
      }
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
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { cerrarSesionUsuario } from '../Redux/usuariosDucks'



const LayoutPublic = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const activo = useSelector(store=>store.usuario.activo)

  const cerrarSesion = async () =>{
    await dispatch(cerrarSesionUsuario())
    navigate('/login')
}


  return (
    <>
    <header className='text-white uppercase text-2xl font-bold bg-rose-600 flex justify-between p-4'>
      <Link to='/'><h1>pokedex</h1></Link>
      {
        activo ? (
          <>
        <button onClick={() => cerrarSesion()}>cerrar sesion</button>
          </>
        ) : (
          <Link to='/login'>login</Link>
        )}
    </header>

    <Outlet/>

    </>
  )
}

export default LayoutPublic
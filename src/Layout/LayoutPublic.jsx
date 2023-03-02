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
    <header className='text-white  text-2xl font-bold bg-rose-600 flex justify-between p-4'>
      <Link to='/'><h1>POKEDEX</h1></Link>
      {
        activo ? (
          <div className=' gap-8 flex'>
        <Link to='/perfil'>Perfil</Link>
        <button onClick={() => cerrarSesion()}>Cerrar Sesion</button>
          </div>
        ) : (
          <Link to='/login'>LOGIN</Link>
        )}
    </header>

    <Outlet/>

    </>
  )
}

export default LayoutPublic
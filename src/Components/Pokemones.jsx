import { useDispatch, useSelector } from "react-redux"
import React from 'react'
import { obtenerPokemonsAction, prevPokemonesAccion, siguientePokemonesAccion, unPokeDetalleAccion } from "../Redux/pokesDucks"
import Detalle from "./Detalle"

const Pokemones = () => {

    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store=>store.pokemones.next)
    const previous = useSelector(store=>store.pokemones.previous)
   
    React.useEffect(() => {
        const fetchData = () => {
            dispatch(obtenerPokemonsAction())
        }
        fetchData()
    }, [dispatch])


  return (
    <>
    <div className="w-2/3 m-auto flex justify-between mt-20">

        <div className="w-3/4">
        <h2 className=" text-lg font-bold">Pokemones</h2>
        <ul className="text-lg   grid grid-cols-3">
            {
                pokemones.map((item, index)=>(
                    
                    <li className="flex justify-between font-semibold items-center ml-4" key={item.name }>    {item.name}
                   <button className="px-3 py-1 m-2 bg-rose-600  text-white rounded-lg " onClick={()=>dispatch(unPokeDetalleAccion(item.url))}>info</button>
                    </li>
                ))
            }
        </ul>
        </div>

        <div>
            <h2 className=" text-center text-lg font-semibold">Detalle</h2>
            <Detalle/>
        </div>

    </div>

    <div className=" w-1/2 flex justify-evenly  m-auto mt-4">
        {
            pokemones.length === 0 &&
            <button onClick={()=>dispatch(obtenerPokemonsAction())}>Get pokemones</button>
        }
        {
            previous && 
            <button className="p-2 mx-8 bg-rose-600 rounded-md text-white" onClick={()=>dispatch(prevPokemonesAccion())}>Anterior</button>
        }
        {
            next && 
        <button className="p-2 mx-8 bg-rose-600 rounded-md text-white"  onClick={()=>dispatch(siguientePokemonesAccion())}>Siguiente</button>
        }
    </div>
    </>
  )
}

export default Pokemones
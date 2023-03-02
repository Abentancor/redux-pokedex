import React from 'react'

import {useDispatch, useSelector} from 'react-redux'
import { unPokeDetalleAccion } from '../Redux/pokesDucks'


const Detalle = () => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(unPokeDetalleAccion())
        }
        fetchData()
    }, [dispatch])

    const pokemon = useSelector(store => store.pokemones.unPokemon)
    // console.log(pokemon)

    return pokemon ? (
        <div className=" border-4 border-black p-2">
            <div className="">
                <img src={pokemon.foto} className="justify-center m-auto" alt=""/>
                <div className="font-bold text-xl text-center uppercase my-2">{pokemon.nombre}</div>
                <p className="py-1">Alto: {pokemon.alto} | Ancho: {pokemon.ancho}</p>
            </div>
        </div>
    ) : null
}

export default Detalle

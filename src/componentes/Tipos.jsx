import React, { useState,useEffect,useContext } from 'react';
import '../hojas-de-estilo/Header.css';
import FavoritosContext from '../contexts/favoritosContext';
import TraducirContext from '../contexts/traducirContext';
import { getTipos } from "../api";

function Tipos({ fetchPokemonsPorTipo, fetchPokemonsFav }) {

    const { pokemonFavoritos } = useContext(FavoritosContext);
    const { nombreTraducido } = useContext(TraducirContext);

    const [tipos, setTipos] = useState([]);

    const todosTipos = async () =>{
        try {
          const data = await getTipos();
          const promises = data.results.map( (tipo) => {
            return(
              tipo.name
            )
          });

        //   ESTOS DOS POP ELIMINAN LOS TIPOS QUE UNKNOWN Y SHADOW
          promises.pop();
          promises.pop();
          setTipos(promises);
        } catch (error) {
          
        }
      }

      useEffect(() => {
        todosTipos();
        }, []);

    return(
        <div className='tipos-container'>
            {tipos.map((tipo) => {
                return(
                    <button className={tipo} key={tipo} onClick={() => fetchPokemonsPorTipo(tipo)}>{nombreTraducido(tipo)}</button>
                )
            })}
            {pokemonFavoritos.length>0 &&
                <button className="boton-fav" onClick={() => fetchPokemonsFav()}>Favoritos</button>
            }
        </div>
    )
}

export default Tipos;

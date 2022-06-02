import React from 'react';
import '../hojas-de-estilo/Pokedex.css';
import { useState,useEffect } from 'react';
import Pokemon from './Pokemon';
import Paginacion from './Paginacion';
import { v4 as uuidv4 } from 'uuid'

function Pokedex({ loading, pokemons, page, setPage, total, setPokemons }) {

    const [filtro,setFiltro] = useState(0);

    const paginaAnterior = () =>{
        const siguientePagina = Math.max(page - 1, 0);
        setPage(siguientePagina);
    }

    const paginaSiguiente = () =>{
        const siguientePagina = Math.min(page + 1, total);
        setPage(siguientePagina);
    }

    const ordenarNumero = (e) =>{
        e.preventDefault();
        pokemons.sort(
            (a,b)=>{
                return a["id"]-b["id"];
            });
        setFiltro(1);
    }

    const ordenarAlfabeticamente = (e) =>{
        e.preventDefault();
        pokemons.sort(
            (a,b)=>{
                return a["name"].localeCompare(b["name"]);
            });
        setFiltro(2);
    }

    useEffect(() => {
        
    }, [filtro]);
    
    return(
        <section id='pokedex'>
            <div className='pokedex-header'>
                <div className='pokedex-logo'><img src={require("../imagenes/pokedex-logo.png")} alt="Logo de la Pokédex" /></div>
                {total <= 1 && pokemons.length > 1 &&
                <div className='pokedex-ordenar'>
                    <h3>Ordenar</h3>
                    <div>
                        <button onClick={ordenarNumero}>Número</button>
                        <button onClick={ordenarAlfabeticamente}>Alfabéticamente</button>
                    </div>
                </div>
                }
                { total > 1 &&
                <Paginacion 
                    onLeftClick={paginaAnterior}
                    onRightClick={paginaSiguiente}
                    pagina={page + 1}
                    paginasTotales={total}
                    setPage={setPage}
                />
                }
            </div>
            { loading ? 
            <div className='loading'>
                <div><img 
                    src={require("../imagenes/pokeball-loading.gif")} 
                    alt="Pokéball que gira" 
                /></div>
                <h2>Cargando...</h2>
            </div>
            :
            <div className='pokedex-container'>
                {pokemons.map((pokemon) => {
                    return(
                        <Pokemon pokemon={pokemon} key={uuidv4()}/>
                    )
                })}
            </div>
            }
        </section>
    )
}

export default Pokedex;

import React, { useState,useContext } from 'react';
import FavoritosContext from '../contexts/favoritosContext';
import ShinysContext from '../contexts/shinysContext';
import TraducirContext from '../contexts/traducirContext';
import '../hojas-de-estilo/Pokemon.css';
import { v4 as uuidv4 } from 'uuid'

function Pokemon({ pokemon }) {

    const [modal,setModal] = useState(false);

    const { pokemonFavoritos, actualizarPokemonFavoritos } = useContext(FavoritosContext);
    const { pokemonShinys, actualizarPokemonShinys } = useContext(ShinysContext);
    const { nombreTraducido } = useContext(TraducirContext);

    const clicarFav = (e) =>{
        e.preventDefault();
        const corregido = pokemon.species.url.replace('-species', '')
        actualizarPokemonFavoritos(corregido);
    }

    const contarCaracteres = (indice) =>{
        if(indice<10){
            return "00";
        }else if(indice<100){
            return "0";
        }else{
            return "";
        }
    }

    const botonShiny = (e) =>{
        e.preventDefault();
        actualizarPokemonShinys(pokemon.species.name);
    };

    

    const manejarModal = (e) =>{
        e.preventDefault();
        setModal(!modal); 
    }

    const traducirStats = (stat) =>{

        let statTraducido;

        switch (stat) {
            case "hp":
                statTraducido="PS";
                break;
            case "attack":
                statTraducido="Ataque";
                break;
            case "defense":
                statTraducido="Defensa";
                break;
            case "special-attack":
                statTraducido="At. esp.";
                break;
            case "special-defense":
                statTraducido="Def. esp.";
                break;
            default:
                statTraducido="Velocidad";
                break;
        }

        return statTraducido;
    }


    const asignarPorcentaje = (num) =>{
        if(num<10){
            return "barra";
        }else if(num<20){
            return "barra barra-20";
        }else if(num<30){
            return "barra barra-30";
        }else if(num<40){
            return "barra barra-40";
        }else if(num<50){
            return "barra barra-50";
        }else if(num<60){
            return "barra barra-60";
        }else if(num<70){
            return "barra barra-70";
        }else if(num<80){
            return "barra barra-80";
        }else if(num<90){
            return "barra barra-90";
        }else if(num<100){
            return "barra barra-100";
        }else{
            return "barra barra-mas100";
        }
    }


    return(

        <div className="pokemon-card">
            <button className={pokemonShinys.includes(pokemon.species.name) ? 'pokemon-shiny shiny-activo' : 'pokemon-shiny'} onClick={botonShiny}><img src={pokemonShinys.includes(pokemon.species.name) ? require("../imagenes/shiny-icon-active.png") : require("../imagenes/shiny-icon.png")} alt="Icono Pokémon Shiny" /></button>
            <div className='pokemon-img' onClick={manejarModal}><img src={pokemonShinys.includes(pokemon.species.name) ? pokemon.sprites.other.home.front_shiny : pokemon.sprites.other.home.front_default} alt={pokemon.species.name} /></div>
            <span className='pokemon-index'>N.º{contarCaracteres(pokemon.id)}{pokemon.id}</span>
            {/* <button onClick={clicarFav} className={pokemonFavoritos.includes(pokemon.species.url.replace('-species','')) ? 'pokemon-fav pokemon-fav-activo' : 'pokemon-fav'}>❤</button> */}
            <button onClick={clicarFav} className='pokemon-fav'>
                {
                    pokemonFavoritos.includes(pokemon.species.url.replace('-species','')) ?
                    <span>❤️</span>
                    :
                    <span>🖤</span>
                }
            </button>
            <h2 className='pokemon-nombre'>{pokemon.species.name}</h2>
            <div className='pokemon-tipos'>
                {pokemon.types.map((tipo,pos) => {
                    return(
                        <div key={pos} className={tipo.type.name}>{nombreTraducido(tipo.type.name)}</div>
                    )
                })}
            </div>
            {modal &&
            <div onClick={manejarModal} className="pokemon-modal">
                <div className="modal-datos" onClick={(e)=>e.stopPropagation()}>
                    <button onClick={manejarModal}>❌</button>
                    <div className="modal-imagen-enlace">
                        <div className="modal-imagen"><img src={pokemon.sprites.other.home.front_default} alt={pokemon.species.name} /></div>
                        <h2 className='modal-nombre'>{pokemon.species.name}</h2>
                        <a href={`https://www.wikidex.net/wiki/${pokemon.species.name}`} target="_blank" rel="noreferrer"><img src={require("../imagenes/wikidex-logo.png")} alt="Enlace a Wikidex" /></a>
                    </div>
                    <div className="modal-stats">
                        <h2>Características de combate</h2>
                        {pokemon.stats.map((cadaUno) => {
                            return(
                                <div className='stat' key={uuidv4()}>
                                    <h3>{traducirStats(cadaUno.stat.name)}</h3><div className={asignarPorcentaje(cadaUno.base_stat)}></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Pokemon;
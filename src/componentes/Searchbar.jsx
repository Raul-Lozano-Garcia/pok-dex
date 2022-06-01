import React,{ useState,useEffect } from 'react';
import '../hojas-de-estilo/Header.css';
import { v4 as uuidv4 } from 'uuid'
import { getPokemons } from "../api";

function Searchbar({ onSearch,pokemons }) {

    const [search, setSearch] = useState('');
    const [todosPokemons, setTodosPokemons] = useState([]);

    const fetchAllPokemons = async () =>{
        try {
          const sacarTodos = await getPokemons();
          const totalPokemon = sacarTodos.count;
          console.log(totalPokemon);

          const data = await getPokemons(totalPokemon, 0);
          const promises = data.results.map( async (pokemon) => {
            return(
              pokemon.name
            )
          });
          const results = await Promise.all(promises);
          setTodosPokemons(results);
        } catch (error) {
          
        }
      }

    const onChange = (e) =>{
        setSearch(e.target.value.trim().toLowerCase());
        if(e.target.value.length === 0){
            onSearch(null);
        }
    }

    const onClick = async (e) =>{
        e.preventDefault();
        onSearch(search);
    }

    useEffect(() => {
        fetchAllPokemons();
      }, []);

    return(
        <div className='searchbar-container'>
            <div className='searchbar'>
                <input type="search" list="data" onChange={onChange} />
                <datalist id="data">
                    {todosPokemons.map((pokemon) => {
                        return(
                            <option key={uuidv4()} value={pokemon} />
                        )
                    })}
                </datalist>
            </div>
            <div className='searchbar-boton'>
                <button onClick={onClick}>🔎</button>
            </div>     
        </div>
    )
}

export default Searchbar;
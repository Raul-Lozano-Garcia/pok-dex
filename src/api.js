export const searchPokemon = async (pokemon) =>{
    try{
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        const response =  await fetch(url);
        const data = await response.json();
        return data;
    }catch(error){

    }
}

export const getTipos = async () =>{
    try{
        const url = `https://pokeapi.co/api/v2/type`;
        const response =  await fetch(url);
        const data = await response.json();
        return data;
    }catch(error){

    }
}

export const searchPokemonPorTipo = async (tipo) =>{
    try{
        const url = `https://pokeapi.co/api/v2/type/${tipo}`;
        const response =  await fetch(url);
        const data = await response.json();
        return data;
    }catch(error){

    }
}

export const getPokemons = async (limit=9,offset=0) =>{
    try{
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        const response =  await fetch(url);
        const data = await response.json();
        return data;
    }catch(error){

    }
}

export const getPokemonData = async (url) =>{
    try{
        const response =  await fetch(url);
        const data = await response.json();
        return data;
    }catch(error){

    }
}
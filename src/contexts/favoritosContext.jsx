import React from 'react';

const FavoritosContext = React.createContext({
    pokemonFavoritos: [],
    actualizarPokemonFavoritos: (id) => null
});

export const FavoritosProvider = FavoritosContext.Provider;

export default FavoritosContext;
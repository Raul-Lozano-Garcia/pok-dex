import React from 'react';

const ShinysContext = React.createContext({
    pokemonShinys: [],
    actualizarPokemonShinys: (id) => null
});

export const ShinysProvider = ShinysContext.Provider;

export default ShinysContext;
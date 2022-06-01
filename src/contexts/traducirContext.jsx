import React from 'react';

const TraducirContext = React.createContext({
    nombreTraducido: (id) => null
});

export const TraducirProvider = TraducirContext.Provider;

export default TraducirContext;
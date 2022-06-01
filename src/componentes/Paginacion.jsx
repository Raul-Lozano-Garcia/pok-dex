import React from 'react';
import '../hojas-de-estilo/Paginacion.css';

function Paginacion({ onLeftClick, onRightClick, pagina, paginasTotales,setPage }) {

    let valorBusqueda;

    const onChange = (e) =>{
        e.preventDefault();
        valorBusqueda = e.target.value;
    }

    const onClick = async (e) =>{
        e.preventDefault();
        if(valorBusqueda >= 1 && valorBusqueda <= paginasTotales){
            setPage(valorBusqueda - 1);
        }
    }

    return(
        <div className='paginacion-container'>
            <div className='paginacion-paginas'>
                { pagina > 1 &&
                <button onClick={onLeftClick}>⬅</button>
                }
                <div>{pagina} de {paginasTotales}</div>
                { pagina < paginasTotales &&
                <button onClick={onRightClick}>➡</button>
                }
            </div>
            <div className='paginacion-busqueda'>
                <input 
                    placeholder='Nº página'
                    type="number" 
                    min="1"
                    max={paginasTotales}
                    onChange={onChange}
                />
                <button onClick={onClick}>Ir</button>
            </div>
        </div>
    )
}

export default Paginacion;
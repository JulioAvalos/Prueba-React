import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PokemonList from './PokemonList';
import Pagination from '../UI/Pagination';
import Loader from './Loader';

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let cancelRequest;
        axios.get(currentPageUrl, {
            cancelToken: new axios.CancelToken(cancelFunction => cancelRequest = cancelFunction)
        }).then(response => {
            setLoading(false);
            setPrevPageUrl(response.data.previous);
            setNextPageUrl(response.data.next);
            setPokemons(response.data.results.map(pokemon => {
                const pokeIndex = pokemon.url.split('/pokemon/');
                const image = pokeIndex[1].substring(0, pokeIndex[1].length - 1);
                // console.log(pokeIndex);
                pokemon.id = image;
                pokemon.img = `https://pokeres.bastionbot.org/images/pokemon/${image}.png`;
                return pokemon;
            }))
        });

        return () => { 
            cancelRequest();
        };

    }, [currentPageUrl]);

    const goToNextPage = () => {
        setCurrentPageUrl(nextPageUrl);
    }

    const goToPrevPage = () => {
        setCurrentPageUrl(prevPageUrl);
    }

    return (
        <React.Fragment>
            <Pagination 
                goToNextPage={nextPageUrl ? goToNextPage : null}
                goToPrevPage={prevPageUrl ? goToPrevPage : null}
            />
            {loading ? <Loader /> : <PokemonList pokemons={pokemons} />}
        </React.Fragment>
    );
}

export default Pokemons;

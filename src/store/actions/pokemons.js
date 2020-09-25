import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setPrevPageUrl = (prevUrl) => {
    return {
        type: actionTypes.SET_URL_PREV_PAGE,
        currentPageUrl: prevUrl
    }
}

export const goToPrevPage = (page) => {
    console.log('prev', page)
    return dispatch => {
        axios.get(page)
        .then(response => {
            const prevPage = response.data.previous;
            const nextPage = response.data.next;
            const pokemons = response.data.results.map(pokemon => {
                const pokeIndex = pokemon.url.split('/pokemon/');
                const image = pokeIndex[1].substring(0, pokeIndex[1].length - 1);
                pokemon.id = image;
                pokemon.img = `https://pokeres.bastionbot.org/images/pokemon/${image}.png`;
                return pokemon;
            });
            dispatch(setPokemons(pokemons, prevPage, nextPage));
        }).catch(error => dispatch(fetchPokemonsFailed()));
    };
};

export const setNextPageUrl = (nextUrl) => {
    return {
        type: actionTypes.SET_URL_NEXT_PAGE,
        currentPageUrl: nextUrl
    }
}

export const setNewPagination = (page) => {
    console.log('next', page);
    return dispatch => {
        axios.get(page)
        .then(response => {
            const prevPage = response.data.previous;
            const nextPage = response.data.next;
            const pokemons = response.data.results.map(pokemon => {
                const pokeIndex = pokemon.url.split('/pokemon/');
                const image = pokeIndex[1].substring(0, pokeIndex[1].length - 1);
                pokemon.id = image;
                pokemon.img = `https://pokeres.bastionbot.org/images/pokemon/${image}.png`;
                return pokemon;
            });
            dispatch(setPokemons(pokemons, prevPage, nextPage));
        }).catch(error => dispatch(fetchPokemonsFailed()));
    };
};

export const setPokemons = (pokemons, prevPage, nextPage)  => {
    return {
        type: actionTypes.SET_POKEMONS,
        pokemons: pokemons,
        prevPageUrl: prevPage,
        nextPageUrl: nextPage
    };
};

export const fetchPokemonsFailed = () => {
    return {
        type: actionTypes.FETCH_POKEMONS_FAILED
    }
}

export const initPokemons = () => {
    return dispatch => {
        axios.get("https://pokeapi.co/api/v2/pokemon")
            .then(response => {
                const prevPage = response.data.previous;
                const nextPage = response.data.next;
                const pokemons = response.data.results.map(pokemon => {
                    const pokeIndex = pokemon.url.split('/pokemon/');
                    const image = pokeIndex[1].substring(0, pokeIndex[1].length - 1);
                    pokemon.id = image;
                    pokemon.img = `https://pokeres.bastionbot.org/images/pokemon/${image}.png`;
                    return pokemon;
                });
                dispatch(setPokemons(pokemons, prevPage, nextPage));
            }).catch(error => dispatch(fetchPokemonsFailed()));
    };
}

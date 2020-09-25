import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setPrevPageUrl = (pokemons, prevPage, nextPage) => {
    return {
        type: actionTypes.SET_PREV_PAGE,
        pokemons: pokemons,
        prevPageUrl: prevPage,
        nextPageUrl: nextPage
    }
}

export const goToPrevPage = (page) => {
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
            dispatch(setPrevPageUrl(pokemons, prevPage, nextPage));
        }).catch(error => dispatch(fetchPokemonsFailed()));
    };
};

export const setNextPageUrl = (pokemons, prevPage, nextPage) => {
    return {
        type: actionTypes.SET_NEXT_PAGE,
        pokemons: pokemons,
        prevPageUrl: prevPage,
        nextPageUrl: nextPage
    }
}

export const goToNextPage = (page) => {
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
            dispatch(setNextPageUrl(pokemons, prevPage, nextPage));
        }).catch(error => dispatch(fetchPokemonsFailed()));
    };
};

export const setPokemons = (pokemons, prevPage, nextPage)  => {
    return {
        type: actionTypes.FETCH_INIT_POKEMONS,
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

export const initPokemons = (params) => {
    return dispatch => {
        const offset = params.offset ? '?offset=' + params.offset  : '';
        const limit =  params.limit ? '&limit=' + params.limit  : '';
        axios.get("https://pokeapi.co/api/v2/pokemon" + offset + limit)
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

export const setPokemonDetails = (detail) => {
    return {
        type: actionTypes.FETCH_POKEMON_DETAILS,
        pokemon: detail
    }
}

export const fetchPokemonDetails = (index) => {
    console.log('buscando pokemon...' , index);
    return dispatch => {
        axios.get("https://pokeapi.co/api/v2/pokemon/" + index)
        .then(response => {
            // name, type (chips),  sprites, front_default (img), abilities(typography), stats (bars.), height, weight
            let detail = {
                img: response.data.sprites.front_default,
                name: response.data.name,
                types: response.data.types,
                stats: response.data.stats,
                height: response.data.height,
                weight: response.data.weight,
            };
            dispatch(setPokemonDetails(detail));
        })
        .catch(error => dispatch(setPokemonDetails(null)));
    }
}

export const onSelectPokemon = () => {
    return {
        type: actionTypes.SELECTED
    }
}
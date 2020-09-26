import * as actionTypes from './actionTypes';

export const setPrevPageUrl = (pokemons, prevPage, nextPage) => {
    return {
        type: actionTypes.SET_PREV_PAGE,
        pokemons: pokemons,
        prevPageUrl: prevPage,
        nextPageUrl: nextPage
    }
}

export const setNextPageUrl = (pokemons, prevPage, nextPage) => {
    return {
        type: actionTypes.SET_NEXT_PAGE,
        pokemons: pokemons,
        prevPageUrl: prevPage,
        nextPageUrl: nextPage
    }
}

export const goToPrevPage = (page) => { 
    return {
        type: actionTypes.INIT_SET_PREV_PAGE,
        page: page
    }
};

export const goToNextPage = (page) => {
    return {
        type: actionTypes.INIT_SET_NEXT_PAGE,
        page: page
    }
};

export const setPokemons = (pokemons, prevPage, nextPage)  => {
    return {
        type: actionTypes.FETCH_POKEMONS,
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
    return {
        type: actionTypes.INIT_FETCH_POKEMONS,
        params: params
    }
}

export const setPokemonDetails = (detail) => {
    return {
        type: actionTypes.FETCH_POKEMON_DETAILS,
        pokemon: detail
    }
}

export const fetchPokemonDetails = (index) => {
    return {
        type: actionTypes.INIT_FETCH_POKEMON_DETAILS,
        index: index
    }
}

export const onSelectPokemon = () => {
    return {
        type: actionTypes.SELECTED
    }
}
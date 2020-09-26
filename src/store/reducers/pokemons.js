import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    pokemons: [],
    pokemon: {},
    currentPageUrl: "https://pokeapi.co/api/v2/pokemon",
    nextPageUrl: null,
    prevPageUrl: null,
    loading: true
};

const setPage = (state, action)  => {
    return updateObject(state, {
        pokemons: action.pokemons,
        prevPageUrl: action.prevPageUrl,
        nextPageUrl: action.nextPageUrl,
        error: false
    });
};

const pokemonSelected = (state, action) => {
    return updateObject(state, {
        pokemon: {}
    })
}

const fetchFailed = (state, action) => {
    return updateObject(state, {
        error: true
    })
}

const fetchPokemonDetails = (state, action) => {
    return updateObject(state, {
        pokemon: action.pokemon
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_PREV_PAGE: return setPage(state, action);
        case actionTypes.SET_NEXT_PAGE: return setPage(state, action);
        case actionTypes.FETCH_INIT_POKEMONS: return setPage(state, action);
        case actionTypes.SELECTED: return pokemonSelected(state, action);
        case actionTypes.FETCH_POKEMONS_FAILED: return fetchFailed(state, action);
        case actionTypes.FETCH_POKEMON_DETAILS: return fetchPokemonDetails(state, action);
        default: return state;
    }
}

export default reducer;

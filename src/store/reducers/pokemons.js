import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pokemons: [],
    pokemon: {},
    currentPageUrl: "https://pokeapi.co/api/v2/pokemon",
    nextPageUrl: null,
    prevPageUrl: null,
    loading: true
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_PREV_PAGE:
            return {
                ...state,
                pokemons: action.pokemons,
                prevPageUrl: action.prevPageUrl,
                nextPageUrl: action.nextPageUrl,
                error: false
            };
        case actionTypes.SET_NEXT_PAGE:
            return {
                ...state,
                pokemons: action.pokemons,
                prevPageUrl: action.prevPageUrl,
                nextPageUrl: action.nextPageUrl,
                error: false
            };
        case actionTypes.FETCH_INIT_POKEMONS: 
            return {
                ...state,
                pokemons: action.pokemons,
                prevPageUrl: action.prevPageUrl,
                nextPageUrl: action.nextPageUrl,
                error: false
            };
        case actionTypes.SELECTED: 
            return {
                ...state,
                pokemon: {}
            };
        case actionTypes.FETCH_POKEMONS_FAILED: 
            return {
                ...state,
                error: true
            };
        case actionTypes.FETCH_POKEMON_DETAILS:
            return {
                ...state,
                pokemon: action.pokemon
            }
        default:
            return state;
    }
}

export default reducer;

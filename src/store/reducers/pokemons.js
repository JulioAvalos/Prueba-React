import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pokemons: [],
    currentPageUrl: "https://pokeapi.co/api/v2/pokemon",
    nextPageUrl: null,
    prevPageUrl: null,
    loading: true
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GO_TO_PREV_PAGE:
            // console.log(action, state);
            return {
                ...state,
                // pokemons: action.pokemons,
                currentPageUrl: action.prevPageUrl
            };
        case actionTypes.GO_TO_NEXT_PAGE:
            // console.log(action, state);
            return {
                ...state,
                // pokemons: action.pokemons,
                currentPageUrl: action.nextPageUrl
            };
        case actionTypes.SET_POKEMONS: 
            return {
                ...state,
                pokemons: action.pokemons,
                prevPageUrl: action.prevPageUrl,
                nextPageUrl: action.nextPageUrl,
                error: false
            };
        case actionTypes.FETCH_POKEMONS_FAILED: 
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}

export default reducer;

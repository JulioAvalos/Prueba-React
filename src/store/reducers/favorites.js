import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    pokemons: []
};

const fetchFavoritePokemons = (state, action) => {
    return updateObject(state, {
        pokemons: action.pokemons
    });
};

const addPokemon = (state, action) => {
    return updateObject(state, {
        pokemons: action.pokemons
    });
};

const removePokemon = (state, action) => {
    return updateObject(state, {
        pokemons: action.pokemons
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FAVORITE_POKEMONS: return fetchFavoritePokemons(state,action);
        case actionTypes.ADD_FAVORITE_POKEMON: return addPokemon(state, action);
        case actionTypes.REMOVE_FAVORITE_POKEMON: return removePokemon(state, action);
        default: 
            return state;
    }
};

export default reducer;
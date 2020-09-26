import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    pokemons: localStorage.getItem('favorites') 
        ? JSON.parse(localStorage.getItem('favorites')) : []
}

const addPokemon = (state, action) => {
    return updateObject(state, {
        pokemons: action.pokemons
    });
}

const removePokemon = (state, action) => {
    return updateObject(state, {
        pokemons: action.pokemons
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD: return addPokemon(state, action);
        case actionTypes.REMOVE: return removePokemon(state, action);
        default: return state;
    }
}

export default reducer;
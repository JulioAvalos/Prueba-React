import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pokemons: [1,2,3,4]
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD: 
            return {
                ...state, 
                pokemons: ['charmander']
            }
        case actionTypes.REMOVE: 
            return {
                ...state,
                pokemons: []            
            }
        default:
            return state;
    }
}

export default reducer;

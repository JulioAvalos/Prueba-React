import * as actionTypes from './actionTypes';

export const fetchFavorites = (favoritePokemons) => {
    return {
        type: actionTypes.FETCH_FAVORITE_POKEMONS,
        pokemons: favoritePokemons
    };
};

export const setFavoritePokemons = (favoritePokemons) => {
    return {
        type: actionTypes.FETCH_FAVORITE_POKEMONS,
        pokemons: favoritePokemons
    }
}

export const onFetchFavoritePokemons = () => {
    return  {
       type: actionTypes.FETCH_INIT_FAV_POKEMONS
    };
};

export const onAddFavoritePokemon = (pokemon) => {
    return {
        type: actionTypes.ADD_INIT_FAVORITE_POKEMON,
        pokemon: pokemon
    };
};

export const addFavorite = (pokemons) => {
    return {
        type: actionTypes.ADD_FAVORITE_POKEMON,
        pokemons: pokemons
    }
}

export const onRemoveFavoritePokemon = (pokemon) => {
    return {
        type: actionTypes.INIT_REMOVE_FAVORITE_POKEMON,
        pokemon: pokemon
    };
};

export const removeFavorite = (favorites) => {
    return {
        type: actionTypes.REMOVE_FAVORITE_POKEMON,
        pokemons: favorites
    };
}
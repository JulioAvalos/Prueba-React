import * as actionTypes from './actionTypes';

export const fetchFavorites = (favoritePokemons) => {
    return {
        type: actionTypes.FETCH_FAVORITE_POKEMONS,
        pokemons: favoritePokemons
    };
};

export const onFetchFavoritePokemons = () => {
    return dispatch => {
        const favoritePokemons = localStorage.getItem('favorites') 
                ? JSON.parse(localStorage.getItem('favorites')) 
                : [];
        dispatch(fetchFavorites(favoritePokemons));
    };
};

export const onAddFavoritePokemon = (pokemon) => {
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    if(!favorites) {
        const favoritesPokemons = [];
        favoritesPokemons.push(pokemon)
        console.log(favoritesPokemons);
        localStorage.setItem('favorites', JSON.stringify(favoritesPokemons));
        favorites = favoritesPokemons;
    } else {
        const addedPokemon = favorites.filter(poke => poke.name === pokemon.name);
        if(addedPokemon.length === 0) 
        favorites.push(pokemon);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    return {
        type: actionTypes.ADD_FAVORITE_POKEMON,
        pokemons: favorites
    };
};

export const onRemoveFavoritePokemon = (pokemon) => {
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    const newFavorites = favorites.filter(poke => poke.name !== pokemon.name);
    console.log('new fav', newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    return {
        type: actionTypes.REMOVE_FAVORITE_POKEMON,
        pokemons: newFavorites
    };

};
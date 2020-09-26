import { put } from 'redux-saga/effects';

import * as actions from '../actions';

export function* addFavoritePokemonSaga(action) {
    let favorites = yield JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
        const favoritesPokemons = yield [];
        yield favoritesPokemons.push(action.pokemon);
        yield localStorage.setItem('favorites', JSON.stringify(favoritesPokemons));
        favorites = yield favoritesPokemons;
    } else {
        const addedPokemon = yield favorites.filter(poke => poke.name === action.pokemon.name);
        if (addedPokemon.length === 0) yield favorites.push(action.pokemon);
        yield localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    yield put(actions.addFavorite(favorites));
}

export function* fetchFavoritePokemonsSaga(action) {
    const favoritePokemons = yield(
        localStorage.getItem('favorites') ?
        JSON.parse(localStorage.getItem('favorites')) :
        []
    );
    
    yield put(actions.setFavoritePokemons(favoritePokemons));
}

export function* removeFavoritePokemonsSaga(action) {
    let favorites = yield JSON.parse(localStorage.getItem('favorites'));
    const newFavorites = yield favorites.filter(poke => poke.name !== action.pokemon.name);
    yield localStorage.setItem('favorites', JSON.stringify(newFavorites));

    yield put(actions.removeFavorite(newFavorites));
}
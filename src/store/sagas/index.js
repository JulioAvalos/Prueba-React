import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {
    addFavoritePokemonSaga,
    fetchFavoritePokemonsSaga,
    removeFavoritePokemonsSaga
} from './favorites';

import {
    goToPrevPageSaga,
    goToNextPageSaga,
    initPokemonsSaga,
    fetchPokemonDetailsSaga
} from './pokemons';

export function* watchFavorites() {
    yield takeEvery(actionTypes.ADD_INIT_FAVORITE_POKEMON, addFavoritePokemonSaga);
    yield takeEvery(actionTypes.FETCH_INIT_FAV_POKEMONS, fetchFavoritePokemonsSaga);
    yield takeEvery(actionTypes.INIT_REMOVE_FAVORITE_POKEMON, removeFavoritePokemonsSaga);
}

export function* watchPokemons() {
    yield takeLatest(actionTypes.INIT_SET_NEXT_PAGE, goToPrevPageSaga);
    yield takeLatest(actionTypes.INIT_SET_PREV_PAGE, goToNextPageSaga);
    yield takeEvery(actionTypes.INIT_FETCH_POKEMONS, initPokemonsSaga);
    yield takeEvery(actionTypes.INIT_FETCH_POKEMON_DETAILS, fetchPokemonDetailsSaga);
}
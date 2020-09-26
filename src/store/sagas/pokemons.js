import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* goToPrevPageSaga(action) {
    try {
        const response = yield axios.get(action.page);
        const prevPage = yield response.data.previous;
        const nextPage = yield response.data.next;
        const pokemons = yield response.data.results.map(pokemon => {
            const pokeIndex = pokemon.url.split('/pokemon/');
            const image = pokeIndex[1].substring(0, pokeIndex[1].length - 1);
            pokemon.id = image;
            pokemon.img = `https://pokeres.bastionbot.org/images/pokemon/${image}.png`;
            return pokemon;
        });
        yield put(actions.setPrevPageUrl(pokemons, prevPage, nextPage));
    } catch (error) {
        yield put(actions.fetchPokemonsFailed());
    }
}

export function* goToNextPageSaga (action) {
    try {
        const response = yield axios.get(action.page);
        const prevPage = yield response.data.previous;
        const nextPage = yield response.data.next;
        const pokemons = yield response.data.results.map(pokemon => {
            const pokeIndex = pokemon.url.split('/pokemon/');
            const image = pokeIndex[1].substring(0, pokeIndex[1].length - 1);
            pokemon.id = image;
            pokemon.img = `https://pokeres.bastionbot.org/images/pokemon/${image}.png`;
            return pokemon;
        });
        yield put(actions.setNextPageUrl(pokemons, prevPage, nextPage));
    }
    catch (error) {
        yield put(actions.fetchPokemonsFailed());
    }
}

export function* initPokemonsSaga (action) {
    const offset = yield (action.params.offset ? '?offset=' + action.params.offset  : '');
    const limit =  yield (action.params.limit ? '&limit=' + action.params.limit  : '');
    try {
        const response = yield axios.get("https://pokeapi.co/api/v2/pokemon" + offset + limit);
        const prevPage = yield response.data.previous;
        const nextPage = yield response.data.next;
        const pokemons = yield response.data.results.map(pokemon => {
            const pokeIndex = pokemon.url.split('/pokemon/');
            const image = pokeIndex[1].substring(0, pokeIndex[1].length - 1);
            pokemon.id = image;
            pokemon.img = `https://pokeres.bastionbot.org/images/pokemon/${image}.png`;
            return pokemon;
        });
        yield put(actions.setPokemons(pokemons, prevPage, nextPage));
    } catch (error) {
        yield put(actions.fetchPokemonsFailed());
    }
}

export function* fetchPokemonDetailsSaga (action) {
    try {
        const response = yield axios.get("https://pokeapi.co/api/v2/pokemon/" + action.index);
        let detail = yield {
            img: response.data.sprites.front_default,
            name: response.data.name,
            types: response.data.types,
            stats: response.data.stats,
            height: response.data.height,
            weight: response.data.weight,
        };
        yield put(actions.setPokemonDetails(detail));
    } catch (error) {
        yield put(actions.setPokemonDetails(null));
    }
   
}
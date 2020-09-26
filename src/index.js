import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import Header from './components/UI/Header';
import favoritesReducer from './store/reducers/favorites';
import pokemonReducer from './store/reducers/pokemons';
import { watchFavorites, watchPokemons } from './store/sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    poke: pokemonReducer,
    fav: favoritesReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)   
));

sagaMiddleware.run(watchFavorites);
sagaMiddleware.run(watchPokemons);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <Header />
            <App /> 
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

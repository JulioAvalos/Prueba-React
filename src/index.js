import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './App';
import favoritesReducer from './store/reducers/favorites';
import pokemonReducer from './store/reducers/pokemons';

const rootReducer = combineReducers({
    poke: pokemonReducer,
    fav: favoritesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)   
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App /> 
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

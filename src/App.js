import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Pokemons from './components/Pokemons/Pokemons';
import Favorites from './components/Favorites/Favorites';

const App = () => {
  return (
    <Switch>
      <Route path="/favorites" exact component={Favorites}/>
      <Route path="/" exact component={Pokemons}/>
      <Redirect to="/" />
    </Switch>
  );

}

export default App;

import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Pokemons from './components/Pokemons/Pokemons';
import CircularProgress from '@material-ui/core/CircularProgress';

const Pokemon = React.lazy(()=> import('./components/Pokemons/Pokemon'));
const Favorites = React.lazy(()=> import('./components/Favorites/Favorites'));

const App = (props) => {
  return (
    <Switch>
      <Route 
        path="/favorites" 
        exact 
        render={(props)=> (
          <Suspense fallback={<CircularProgress />}>
            <Favorites {...props}/>
          </Suspense>
        )}
      />
      <Route 
        path="/detail/:id" 
        exact 
        render={(props) => (
          <Suspense fallback={<CircularProgress />}>
            <Pokemon {...props}/>
          </Suspense>
        )}
      />
      <Route path="/" exact component={Pokemons}/>
      <Redirect to="/" />
    </Switch>
  );

}

export default App;

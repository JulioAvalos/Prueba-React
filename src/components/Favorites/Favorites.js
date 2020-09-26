import React, { Component } from 'react';
import { connect } from 'react-redux';

import FavoriteList from './FavoriteList';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import * as actionCreators from '../../store/actions';

class Favorites extends Component {

    componentDidMount () {
        this.props.onInitFavorites();
    }

    render () {
        return (
            <React.Fragment>
                <Grid container justify="center" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">Pokemon Favoritos</Typography>
                    </Grid>
                </Grid>
                <FavoriteList 
                    favorites={this.props.favorites}
                    onRemove={this.props.onRemovePokemon} 
                />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        favorites: state.fav.pokemons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitFavorites: () => dispatch(actionCreators.onFetchFavoritePokemons()),
        onRemovePokemon: (pokemon) => dispatch(actionCreators.onRemoveFavoritePokemon(pokemon)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
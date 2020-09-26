import React, { Component } from 'react';
import { connect } from 'react-redux';

import FavoriteList from './FavoriteList';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import * as actionCreators from '../../store/actions';

class Favorites extends Component {

    render () {
        return (
            <React.Fragment>
                <Grid container justify="center" alignItem="center">
                    <Grid item>
                        <Typography variant="h4">Pokemon Favoritos</Typography>
                    </Grid>
                </Grid>
                <FavoriteList 
                    onRemove={this.props.onRemovePokemon} 
                    favorites={this.props.favorites}
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
        onRemovePokemon: (pokemon) => dispatch(actionCreators.onRemoveFavoritePokemon(pokemon)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
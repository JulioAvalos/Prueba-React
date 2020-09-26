import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

import PokemonList from './PokemonList';
import Pagination from '../UI/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@material-ui/core';

import * as actionCreators from '../../store/actions';

class Pokemons extends Component {

    state = {
        searchWord: ''
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const params = {};

        for (let param of query.entries()) {
            if (isNaN(param[1])) {
                params[param[0]] = param[1]
            } else {
                params[param[0]] = +param[1]
            }
        }
        this.props.onInitPokemons(params);
    }

    handleSearch = (event) => {
        this.setState({searchWord: event.target.value});
    }

    filterByName () {
        return this.props.pokemons.filter(pokemon => 
            pokemon.name.toLowerCase().includes(this.state.searchWord.toLowerCase())
        );
    }


    render () {

        if(this.props.pokemon) return (
            <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <Typography variant="h5">
                        Cargando... 
                    </Typography>
                </Grid>
                <Grid item>
                    <CircularProgress color="secondary" style={{width: '100px', height: '100px'}}/>
                </Grid>
            </Grid>
        )

        return (
            <React.Fragment>
                <Pagination/>
                <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{marginTop: '1.25em', marginBottom:'1.25em'}}
                >
                    <Grid item>
                        <TextField 
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faSearch}/></InputAdornment>,
                                placeholder: 'Buscar pokemon...'
                            }}
                            onChange={(event) => this.handleSearch(event)}
                        />
                    </Grid>
                </Grid>
                <PokemonList 
                    pokemons={this.filterByName()} 
                    onSelect={this.props.onSelectPokemon}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        pokemons: state.poke.pokemons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPokemons: (params) => dispatch(actionCreators.initPokemons(params)),
        onSelectPokemon: () => dispatch(actionCreators.onSelectPokemon())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);

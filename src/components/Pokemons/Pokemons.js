import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import PokemonList from './PokemonList';
import Pagination from '../UI/Pagination';
import * as actionCreators from '../../store/actions/pokemons';

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

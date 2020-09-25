import React, { Component } from 'react';
import { connect } from 'react-redux';

import PokemonList from './PokemonList';
import Pagination from '../UI/Pagination';
import * as actionCreators from '../../store/actions/pokemons';

class Pokemons extends Component {

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

    render () {
        return (
            <React.Fragment>
                <Pagination />
                <PokemonList 
                    pokemons={this.props.pokemons} 
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

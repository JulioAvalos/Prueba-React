import React, { Component } from 'react';
import { connect } from 'react-redux';

import PokemonList from './PokemonList';
import Pagination from '../UI/Pagination';
import * as actionCreators from '../../store/actions/pokemons';

class Pokemons extends Component {

    componentDidMount() {
        // console.log(this.props);
        this.props.onInitPokemons();
    }

    render () {
        return (
            <React.Fragment>
                <Pagination />
                <PokemonList pokemons={this.props.pokemons} />
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
        onInitPokemons: () => dispatch(actionCreators.initPokemons())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);

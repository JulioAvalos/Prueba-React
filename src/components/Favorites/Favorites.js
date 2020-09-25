import React, { Component } from 'react';
import { connect } from 'react-redux';

class Favorites extends Component {

    render () {
        return (
            <div>
                {this.props.favorites.map(pokemon => pokemon)}
            </div>
        );
    }
    
}

const mapStateToProps = state => {
    return {
        favorites: state.fav.pokemons
    };
};

export default connect(mapStateToProps)(Favorites);

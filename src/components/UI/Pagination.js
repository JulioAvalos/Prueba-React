import React, { Component }  from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as actionCreators from '../../store/actions/pokemons';

class Pagination extends Component {
    render () {
        return (
            <Grid 
                container 
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
            >
                {this.props.prevPage && 
                    <Grid item> 
                        <Button color="secondary" variant="contained" onClick={() => this.props.onGoToPrevPage(this.props.prevPage)}>
                            Anterior
                        </Button>
                    </Grid>
                }
                {this.props.nextPage && 
                    <Grid item> 
                        <Button color="secondary" variant="contained" onClick={()=> this.props.onGoToNextPage(this.props.nextPage)}>
                            Siguiente
                        </Button> 
                    </Grid>
                }
            </Grid>
        ); 
    }
}

const mapStateToProps = state => {
    return {
        prevPage: state.poke.prevPageUrl,
        nextPage: state.poke.nextPageUrl
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGoToPrevPage: (page) => dispatch(actionCreators.goToPrevPage(page)),
        onGoToNextPage: (page) => dispatch(actionCreators.goToNextPage(page)),
        onInitPokemons: () => dispatch(actionCreators.initPokemons())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
 
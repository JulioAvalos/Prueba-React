import React, { Component }  from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                            <FontAwesomeIcon icon={faChevronLeft} style={{marginRight: '1em'}}/>
                            Anterior
                        </Button>
                    </Grid>
                }
                {this.props.nextPage && 
                    <Grid item> 
                        <Button color="secondary" variant="contained" onClick={()=> this.props.onGoToNextPage(this.props.nextPage)}>
                            Siguiente
                            <FontAwesomeIcon icon={faChevronRight}  style={{marginLeft: '1em'}}/>
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
 
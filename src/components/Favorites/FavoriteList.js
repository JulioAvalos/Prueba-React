import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Avatar from '@material-ui/core/Avatar';

import * as actionCreators from '../../store/actions';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8)
    },
});

class Favorites extends Component {

    state = {
        open: false
    };

    handleClose = () => {
        this.setState({open: false});
    };


    render() {
        const { classes } = this.props;

        return (
            <Grid
                container 
                spacing={3}
            >   
                {this.props.favorites.map(pokemon => (
                    <Grid 
                        item 
                        lg={2}
                        md={3}
                        sm={4}
                        xs={6}
                        key={pokemon.name}
                    >
                        <Paper className={classes.paper}>
                            <Grid container justify="flex-end">
                                <IconButton color="secondary" onClick={()=>{
                                        this.props.onRemovePokemon(pokemon);
                                        this.setState({open: true});
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </IconButton>
                            </Grid>
                            <Grid container justify="center" alignItems="center"> 
                                <Grid item>
                                    <Avatar 
                                        className={classes.large}
                                        src={pokemon.img}
                                        alt={pokemon.name}
                                    / >
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">{pokemon.name}</Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
                <Snackbar 
                    open={this.state.open} 
                    autoHideDuration={4000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    message="Se ha quitado de favoritos!"
                    onClose={() => this.handleClose()}
                    action={
                        <Button 
                            onClick={()=>this.handleClose()} 
                            style={{color: '#FFF'}}
                        >
                            Cerrar
                        </Button>
                    }
                />
            </Grid>

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



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Favorites));

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import LinearProgress  from '@material-ui/core/LinearProgress';
import CircularProgress  from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Avatar from '@material-ui/core/Avatar';

import Error from '../UI/Error';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faStar } from "@fortawesome/free-solid-svg-icons";

import * as actionCreators from '../../store/actions/';
  
const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        // marginTop: '2em',
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14)
    },
    chip: {
        marginRight: '2em',
    },
    normal: {
        color: '#fff',
        backgroundColor: '#A8A77A'
    },
    fire: {
        color: '#fff',
        backgroundColor: '#EE8130'
    },
    water: {
        color: '#fff',
        backgroundColor: '#6390F0'
    },
    electric: {
        color: '#fff',
        backgroundColor: '#F7D02C'
    },
    grass: {
        color: '#fff',
        backgroundColor: '#7AC74C'
    },
    ice: {
        color: '#fff',
        backgroundColor: '#96D9D6'
    },
    fighting: {
        color: '#fff',
        backgroundColor: '#C22E28'
    },
    poison: {
        color: '#fff',
        backgroundColor: '#A33EA1'
    },
    ground: {
        color: '#fff',
        backgroundColor: '#E2BF65'
    },
    flying: {
        color: '#fff',
        backgroundColor: '#A98FF3'
    },
    psychic: {
        color: '#fff',
        backgroundColor: '#F95587'
    },
    bug: {
        color: '#fff',
        backgroundColor: '#A6B91A'
    },
    rock: {
        color: '#fff',
        backgroundColor: '#B6A136'
    },
    ghost: {
        color: '#fff',
        backgroundColor: '#735797'
    },
    dragon: {
        color: '#fff',
        backgroundColor: '#6F35FC'
    },
    dark: {
        color: '#fff',
        backgroundColor: '#705746'
    },
    steel: {
        color: '#fff',
        backgroundColor: '#B7B7CE'
    },
    fairy: {
        color: '#fff',
        backgroundColor: '#D685AD'
    }
});

class Pokemon extends Component {

    state = {
        loadingImage: false,
        open: false
    };

    componentDidMount() {
        const index = this.props.match.params.id;
        this.props.onFetchDetails(index);
    }

    handleImageLoad = () => {
        this.setState({loadingImage: false});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid 
                container
                justify="center"
                alignItems="center"
            >
                {this.props.pokemon ? (
                    <Paper className={classes.paper}>
                        {!this.props.pokemon.name && 
                            <CircularProgress 
                                color="secondary" 
                                style={{
                                    width: '150px', 
                                    height: '150px'
                                }}
                            />
                        }
                        <Grid item>
                            {this.props.pokemon.name && 
                                 <Grid 
                                    container   
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Button color="secondary" onClick={() => this.props.history.goBack()}>
                                            <FontAwesomeIcon icon={faChevronLeft} style={{marginRight: '1em'}} />
                                                Volver
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <IconButton 
                                            style={{color: '#efcf5b'}}
                                            onClick={ ()=> {
                                                this.setState({open: true})
                                                this.props.onAddPokemon(this.props.pokemon)
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faStar}/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            }
                            <Typography variant="h3">
                                {this.props.pokemon.name}
                            </Typography>
                            <Grid container justify="center" alignItems="center">
                                <Grid item>
                                {this.state.loadingImage 
                                    ? <CircularProgress /> : 
                                    <Avatar 
                                        className={classes.large}
                                        alt={this.props.pokemon.name}
                                        src={this.props.pokemon.img} 
                                    />
                                }
                                </Grid>
                            </Grid>
                                
                            <Typography variant="body1">
                               {this.props.pokemon.height ? 'Height: ' + this.props.pokemon.height + " m" : null }
                            </Typography>
                            <Typography variant="body1">
                              {this.props.pokemon.weight ? 'Weight: ' + this.props.pokemon.weight + " kg" : null}
                            </Typography>
                            <Grid 
                                container
                                spacing={2}
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                                style={{marginTop: '1.25em',marginBottom: '1.25em'}}
                            >
                                {this.props.pokemon.stats &&
                                    this.props.pokemon.stats.map((stat, index) =>
                                        <Grid 
                                            item 
                                            lg={4}
                                            md={4}
                                            sm={6}
                                            xs={12}
                                            key={`${stat.name}-${index}`}
                                        >   
                                            <LinearProgress 
                                                variant="determinate" 
                                                value={stat.base_stat} 
                                                color="secondary"
                                            />
                                            <Typography variant="body1">
                                                {stat.stat.name.replace("-"," ")}:  {stat.base_stat}
                                            </Typography>
                                        </Grid>
                                    )
                                }
                            </Grid>
                            <Grid 
                                container 
                                spacing={2}
                                justify="center"
                                alignItems="center"
                            >
                                {this.props.pokemon.types &&
                                    this.props.pokemon.types.map((type, index) => {
                                        const typeColor = classes[`${type.type.name}`]
                                        return (
                                            <Grid item key={`${type.name}-${index}`}>
                                                <Chip className={typeColor} label={type.type.name} />
                                            </Grid>
                                        );
                                    }
                                    )
                                }

                            </Grid>
                        </Grid>
                    </Paper>

                ) : (
                   <Error />
                )}
                <Snackbar 
                    open={this.state.open} 
                    autoHideDuration={4000}
                    ContentProps={{
                        style: {
                            backgroundColor: '#efcf5b'
                        }
                    }}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    message="Se ha agregado a favoritos!"
                    onClose={() => this.handleClose()}
                    action={
                        <Button onClick={()=>this.handleClose()} style={{color: '#FFF'}}>
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
        pokemon: state.poke.pokemon
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchDetails: (index) => dispatch(actionCreators.fetchPokemonDetails(index)),
        onAddPokemon: (pokemon) => dispatch(actionCreators.onAddFavoritePokemon(pokemon))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Pokemon));
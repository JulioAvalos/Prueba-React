import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faStar } from "@fortawesome/free-solid-svg-icons";

import * as actionCreators from '../../store/actions/pokemons';
import { ButtonBase } from '@material-ui/core';

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
        loadingImage: false
    };

    componentDidMount() {
        console.log(this.props);
        const index = this.props.match.params.id;
        console.log('indice? ', index);
        this.props.onFetchDetails(index);
    }

    handleImageLoad = () => {
        console.log('cargo la imagen');
        this.setState({loadingImage: false});
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
                                        <IconButton style={{color: '#efcf5b'}}>
                                            <FontAwesomeIcon icon={faStar}/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            }
                            <Typography variant="h3">
                                {this.props.pokemon.name}
                            </Typography>
                                {this.state.loadingImage 
                                    ? <CircularProgress /> : 
                                    <img onLoad={() => this.handleImageLoad()} src={this.props.pokemon.img} />
                                }
                            <Typography variant="body1">
                               {this.props.pokemon.height ? 'Height: ' + this.props.pokemon.height: null }
                            </Typography>
                            <Typography variant="body1">
                              {this.props.pokemon.weight ? 'Weight:' + this.props.pokemon.weight : null}
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
                    <Paper className={classes.paper} style={{marginTop: '3em'}}>
                        <Grid 
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography variant="h3">
                                    Error - 404!
                                </Typography>
                                <Typography variant="h5">
                                    No se ha encontrado el pokemon!
                                </Typography>
                            </Grid>
                            <Grid item style={{marginTop: '2em'}}>
                                <Button variant="contained" color="secondary" to="/" component={Link}>Volver</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
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
        onFetchDetails: (index) => dispatch(actionCreators.fetchPokemonDetails(index))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Pokemon));
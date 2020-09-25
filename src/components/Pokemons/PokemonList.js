import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const PokemonList = props => {
    const classes = useStyles();
    return (
        <Grid container spacing={3}>
            {props.pokemons.map(pokemon => {
                // console.log(pokemon);
                return (
                    <Grid item xs={3} key={pokemon.name}>
                        <Paper className={classes.paper}>

                            <Grid item>
                                <img
                                    src={pokemon.img}
                                    alt={pokemon.name}
                                    style={{ maxWidth: '45px' }}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={Link}
                                    to="/"
                                    onClick={()=> console.log(pokemon.id, pokemon.name)}
                                >
                                    {pokemon.name}
                                </Button>
                            </Grid>

                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default PokemonList;

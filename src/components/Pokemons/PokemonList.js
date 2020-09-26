import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
}));

const PokemonList = props => {
    const classes = useStyles();
    return (
        <Grid 
            container 
            spacing={3}
        >
            {props.pokemons.map(pokemon => {
                // console.log(pokemon);
                return (
                    <Grid 
                        item 
                        lg={2}
                        md={3}
                        sm={4}
                        xs={6}
                        key={pokemon.name}
                    >
                        <Paper className={classes.paper}>
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
                                <Button
                                    component={Link}
                                    to={"/detail/" + pokemon.id}
                                    onClick={() => props.onSelect(pokemon.id)}
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

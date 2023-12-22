import {useEffect, useState} from "react";
import {Avatar, Button, Grid, Paper, Typography} from "@mui/material";
import {map} from "lodash";
import {IPokemonDetail} from "../interfaces";
import {BsTrash} from "react-icons/bs";

function Favorites() {

    const [pokemonList, setPokemonList] = useState<IPokemonDetail[]>([]);

    useEffect(() => {
        const favorites = localStorage.getItem('favorites');
        if (favorites) {
            const favoriteList: IPokemonDetail[] = JSON.parse(favorites);
            setPokemonList(favoriteList);
        }
    }, []);

    //va al principio de la pagina en caso de que hayan mas de 16+ favoritos
    useEffect(() => {
        window.scrollTo({top: 0, left: 0});
    }, [pokemonList]);

    const removeFavorites = (pokemon: IPokemonDetail) => {
        const favorites = localStorage.getItem('favorites');
        if (favorites) {
            const favoriteList: IPokemonDetail[] = JSON.parse(favorites);
            const foundPokemon = favoriteList.find((poke) => poke.name === pokemon.name);

            if (foundPokemon) {
                const newFavorites = favoriteList.filter((poke) => poke.name !== pokemon.name)
                localStorage.setItem('favorites', JSON.stringify(newFavorites));
                setPokemonList(newFavorites);
            }
        }
    }

    return (
        <Grid container alignItems="center" alignContent="center" justifyContent="center" spacing={2} sx={{mt: 2}}>
            <Grid container item xs={10} spacing={2} sx={{mb: 4}}>
                {pokemonList && pokemonList.length > 0 ? map(pokemonList, (pokemonDetail) =>
                    <Grid container item xs={12} sm={6} md={3} key={`pokemon-item-${pokemonDetail.id}`}>
                        <Paper sx={{width: '100%', height: '100%', padding: 2}}>
                            <Grid container item xs={12} spacing={1} direction="column" alignContent="center"
                                  justifyContent="center">
                                <Grid container item alignContent="center" justifyContent="center">
                                    <Avatar
                                        sx={{
                                            width: 100,
                                            height: 100
                                        }}
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetail.id}.png`}
                                        alt={`pokemon-img-${pokemonDetail.name}`}
                                    />
                                </Grid>
                                <Grid container item alignContent="center" justifyContent="center">
                                    <Typography variant="overline" sx={{fontWeight: 'bold'}}>
                                        {pokemonDetail.name.toUpperCase()}
                                    </Typography>
                                </Grid>
                                <Grid container item alignContent="center" justifyContent="center">
                                    <Button autoFocus variant="outlined" size="large"
                                            onClick={() => removeFavorites(pokemonDetail)}>
                                        <BsTrash/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ) : (
                    <div>No hay favoritos</div>
                )}
            </Grid>
        </Grid>
    );
}

export default Favorites;

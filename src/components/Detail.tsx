import {
    Avatar,
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, IconButton, LinearProgress, Snackbar, Stack,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {CgClose} from "react-icons/cg";
import {FiHeart} from "react-icons/fi";
import {map} from "lodash";
import {GoHeartFill} from "react-icons/go";
import {getPokemonDetail} from "../api/services/pokemon.ts";
import {IPokemonDetail} from "../interfaces";
import {pokemonTypes} from "../utils/utils.ts";

interface IDetailProps {
    id?: number | null | undefined;
    openDialog: boolean;
    handleClose: (value: boolean) => void
}

function Detail({id, openDialog, handleClose}: IDetailProps) {

    const [pokemonDetail, setPokemonDetail] = useState<IPokemonDetail | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                if (id) {
                    const {data} = await getPokemonDetail(id);
                    foundFavorite(data);
                    setPokemonDetail(data);
                }
            } catch (e) {
                console.error('error getting details: ', e);
            }
        })();
    }, [id]);

    const closeDialog = () => {
        handleClose(true);
    }

    const foundFavorite = (pokemon: IPokemonDetail) => {
        const favorites = localStorage.getItem('favorites');
        if (favorites) {
            const favoriteList: IPokemonDetail[] = JSON.parse(favorites);
            const foundPokemon = favoriteList.find((poke) => poke.name === pokemon.name);
            console.log('es fav?', foundPokemon);
            if (foundPokemon) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false)
            }
        } else {
            setIsFavorite(false);
        }
    }

    const checkFavorite = (pokemon: IPokemonDetail) => {
        const favorites = localStorage.getItem('favorites');
        try {
            if (favorites) {
                const favoriteList: IPokemonDetail[] = JSON.parse(favorites);
                const foundPokemon = favoriteList.find((poke) => poke.name === pokemon.name);

                if (foundPokemon) {
                    const newFavorites = favoriteList.filter((poke) => poke.name !== pokemon.name)
                    localStorage.setItem('favorites', JSON.stringify(newFavorites));
                    setIsFavorite(false);
                } else {
                    favoriteList.push(pokemon);
                    localStorage.setItem('favorites', JSON.stringify(favoriteList));
                    setIsFavorite(true);
                }
            } else {
                const favoriteList = [];
                favoriteList.push(pokemon);
                localStorage.setItem('favorites', JSON.stringify(favoriteList));
                setIsFavorite(true);
            }
        } catch (e) {
            console.error('Maximo permitido de pokemon alcanzado!');
            setOpen(true);
        }
    }

    return pokemonDetail && (
        <>
            <Dialog
                open={openDialog}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    backdropFilter: "blur(1px)"
                }}
            >
                <DialogTitle id="alert-dialog-title" align="center" sx={{fontWeight: 'bold', fontSize: '1.8em'}}>
                    {pokemonDetail.name.toUpperCase()}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" align="center">
                        <Grid container justifyContent="center"
                              alignItems="center">
                            <Grid item>
                                <Avatar
                                    sx={{
                                        width: 150,
                                        height: 150
                                    }}
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                    alt={`pokemon-img-${pokemonDetail.name}`}
                                />
                            </Grid>
                        </Grid>

                        <Typography variant="body1">
                            Height: {pokemonDetail.height} m
                        </Typography>
                        <Typography variant="body1">
                            Weight: {pokemonDetail.weight} kg
                        </Typography>
                        <Grid container
                              spacing={2}
                              justifyContent="center"
                              alignItems="center"
                              sx={{mt: 1}}
                        >
                            {map(pokemonDetail.stats, (stat) =>
                                <Grid item lg={4}
                                      md={4}
                                      sm={6}
                                      xs={12}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={stat.base_stat}
                                        color="secondary"
                                    />
                                    <Typography variant="body1">
                                        {stat.stat.name.replace("-", " ")}: {stat.base_stat}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                        <Stack direction="row" justifyContent="center"
                               alignItems="center" spacing={1} sx={{mt: 2}}>
                            {map(pokemonDetail.types, ((type) =>
                                    <Chip
                                        key={`pokemon-type-${id}-${type.type.name}`}
                                        label={type.type.name.toUpperCase()}
                                        size="small"
                                        sx={{
                                            ...pokemonTypes[`${type.type.name}`],
                                            fontWeight: 'bold'
                                        }}
                                    />
                            ))}
                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Grid container alignContent="center" justifyContent="center" spacing={2} sx={{mb: 1}}>
                        <Grid item>
                            <Button autoFocus variant="outlined" size="large"
                                    onClick={() => checkFavorite(pokemonDetail)}>
                                {isFavorite ? <GoHeartFill color='#FF5C5C'/> : <FiHeart color="#000"/>}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={closeDialog} size="large">
                                <CgClose/>
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={open}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                ContentProps={{
                    style: {
                        backgroundColor: '#'
                    }
                }}
                message="Maximo número pokemon permitidos en favorito!"
                action={
                    <IconButton disableRipple size="small" onClick={() => setOpen(false)}>
                        <CgClose color="#FFF"/>
                    </IconButton>
                }
            />
        </>
    );
}

export default Detail;

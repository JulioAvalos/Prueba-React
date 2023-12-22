import {
    Avatar,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";
// import {pokemonTypes} from "../utils/utils.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {map} from 'lodash';
import {MdArrowBack, MdArrowForward, MdClose, MdListAlt, MdOutlineSearch} from "react-icons/md";
import {getPokemonList, getPokemonSpecies} from "../api/services/pokemon.ts";
import {IPokemon} from "../interfaces";
import Loading from "../components/Loading.tsx";
import NotMatchesFound from "../components/NotMatchesFound.tsx";
import Detail from "../components/Detail.tsx";

function MainPage() {

    const [pokemonList, setPokemonList] = useState<IPokemon[]>();
    const [cachedList, setCachedList] = useState<IPokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchWord, setSearchWord] = useState<string | null>('');
    const [filterFlag, setFilterFlag] = useState(false);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [previousUrl, setPreviousUrl] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null | undefined>(null);

    useEffect(() => {
        (async () => {
            try {
                await fetchCache();
                await fetchData();
            } catch (e) {
                console.error('error: ', e);
            }
        })();
    }, []);

    useEffect(() => {
        let delayDebounce: NodeJS.Timeout;
        if (searchWord && searchWord?.trim().length > 2) {
            delayDebounce = setTimeout(() => {
                setFilterFlag(true);
                const filterPokemon = cachedList.filter((value: IPokemon) => {
                    if (value && value.name && searchWord.trim().length > 0) {
                        return value.name.trim().toLowerCase().includes(searchWord.trim().toLowerCase());
                    } else {
                        return false;
                    }
                });
                setPokemonList(filterPokemon);
            }, 900);
        }
        return () => clearTimeout(delayDebounce);
    }, [searchWord]);

    const fetchData = async (offset?: number, limit?: number) => {
        const {data} = await getPokemonList(offset, limit);
        const result = data.results.map((value: { name: string, url: string }) => {
            const segments = value.url.split('/');
            const pokemonId = segments[6];
            return {
                ...value,
                id: Number(pokemonId)
            }
        });
        setNextUrl(data.next);
        setPreviousUrl(data.previous);
        setPokemonList(result);
        setLoading(false);
    }

    const fetchCache = async () => {
        const {data} = await getPokemonSpecies();
        const result = data.results.map((value: { name: string, url: string }) => {
            const segments = value.url.split('/');
            const pokemonId = segments[6];
            return {
                ...value,
                id: Number(pokemonId)
            }
        });
        setCachedList(result);
    }

    const handleSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchWord(event.target.value);
    }

    const previousPage = async () => {
        if (previousUrl) {
            const urlParams = new URLSearchParams(new URL(previousUrl).search);
            const offset = urlParams.get('offset');
            const limit = urlParams.get('limit');
            await fetchData(Number(offset), Number(limit));
        }
    }
    const nextPage = async () => {
        if (nextUrl) {
            const urlParams = new URLSearchParams(new URL(nextUrl).search);
            const offset = urlParams.get('offset');
            const limit = urlParams.get('limit');
            await fetchData(Number(offset), Number(limit));
        }
    }

    const clearFilter = async () => {
        setSearchWord('');
        setFilterFlag(false);
        await fetchData();
    }

    const selectDetail = (id: number | null | undefined) => {
        setSelectedId(id);
        setOpenDialog(true);
    }

    return (
        <>
            <Grid container alignItems="center" alignContent="center" justifyContent="center" spacing={2}>
                <Grid container item xs={12} alignContent="center" justifyContent="center" alignItems="center">
                    <Grid container item xs={1} alignContent="end" justifyContent="end">
                        <IconButton onClick={previousPage} size="small" disableRipple
                                    sx={{visibility: `${previousUrl === null || filterFlag ? 'hidden' : 'visible'}`}}>
                            <MdArrowBack color="#000"/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            sx={{width: '100%', pr: 2, pl: 2}}
                            size="small"
                            value={searchWord}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><MdOutlineSearch
                                    color="#000"/></InputAdornment>,
                                placeholder: 'Buscar pokemon...',
                                endAdornment: <InputAdornment position="end">
                                    {filterFlag && (
                                        <IconButton onClick={clearFilter} size="small" disableRipple>
                                            <MdClose/>
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            }}
                            onChange={(event) => handleSearch(event)}
                        />
                    </Grid>
                    <Grid container item xs={1} alignContent="start" justifyContent="start">
                        <IconButton onClick={nextPage} size="small" disableRipple
                                    sx={{visibility: `${nextUrl === null || filterFlag ? 'hidden' : 'visible'}`}}>
                            <MdArrowForward color="#000"/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container item xs={10} spacing={2} sx={{mb: 4}}>
                    {loading ? (
                            <Loading/>
                        ) :
                        pokemonList && pokemonList.length > 0 ? map(pokemonList, ({id, name}) =>
                            <Grid container item xs={12} sm={6} md={3} key={`pokemon-item-${id}`}>
                                <Paper sx={{width: '100%', height: '100%', padding: 2}}>
                                    <Grid container item xs={12} spacing={1} direction="column" alignContent="center"
                                          justifyContent="center">
                                        <Grid container item alignContent="center" justifyContent="center">
                                            <Avatar
                                                sx={{
                                                    width: 100,
                                                    height: 100
                                                }}
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                                alt={`pokemon-img-${name}`}
                                            />
                                        </Grid>
                                        <Grid container item alignContent="center" justifyContent="center">
                                            <Typography variant="overline" sx={{fontWeight: 'bold'}}>
                                                {name}
                                            </Typography>
                                        </Grid>
                                        <Grid container item alignContent="center" justifyContent="center">
                                            <Button variant="outlined" startIcon={<MdListAlt/>}
                                                    onClick={() => selectDetail(id)}>Detalle</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ) : pokemonList && pokemonList.length === 0 && (
                            <NotMatchesFound/>
                        )}
                </Grid>
            </Grid>
            <Detail id={selectedId} openDialog={openDialog} handleClose={() => setOpenDialog(false)}/>
        </>
    )
}

export default MainPage;

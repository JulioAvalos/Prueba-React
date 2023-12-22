import {http as axios} from '../axios';
import {IPokeAPIResponse, IPokemonDetail} from "../../interfaces";

const options = {'Content-Type': 'application/json'};

export const getPokemonList = (offset: number = 0, limit: number = 12) => {
    const url = `/pokemon`;
    return axios.get<IPokeAPIResponse>(url, {
        params: {offset, limit},
        headers: options
    });
};

export const getPokemonSpecies = () => {
    const url = `/pokemon-species`;
    return axios.get<IPokeAPIResponse>(url, {
        params: {limit: 2000},
        headers: options
    });
}

export const getPokemonDetail = (id: number) => {
    const url = `/pokemon/${id}`;
    return axios.get<IPokemonDetail>(url, {
        headers: options
    });
}

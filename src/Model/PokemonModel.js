'use strict';

// A aquisicao dos dados do pokemon da PokeAPI poderia ser feito em paralelo a acao de persistir no sequelize
// para obter melhor desempenho

const Pokedex = require('pokedex-promise-v2');
const Model = require('./Model');
const PokemonRepository = require('../Repository/PokemonRepository');
const dateISO = require('../utils/date').dateISO;

class PokemonModel extends Model {
    constructor() {
        super(PokemonRepository);
        this.pokedex = new Pokedex();
    }

    mergeWithExternalPokemonData(pokemon) {
        return this.pokedex.getPokemonByName(pokemon.number)
            .then((pokedexData) => {
                pokemon.additionalData = pokedexData;
                return pokemon;
            });
    }

    createPokemon(pokemonBody) {
        pokemonBody.firstSeen = dateISO();
        return super.create(pokemonBody)
            .then(this.mergeWithExternalPokemonData);
    }

    updatePokemon(pokemonBody) {
        pokemonBody.lastSeen = dateISO();
        return super.update(pokemonBody)
            .then(this.mergeWithExternalPokemonData);
    }

    extinctPokemon(pokemonBody) {
        pokemonBody.extinct = dateISO();
        return super.update(pokemonBody);
    }

    getAllPokemons(page = 1) {
        return super.read(undefined, page);
    }

    getPokemonBy(attribute, value) {
        return super.read({
            [attribute]: value,
        })
            .then(this.mergeWithExternalPokemonData);
    }

    getPokemonByNumber(number) {
        return this.getPokemonBy('number', number);
    }

    getPokemonByName(name) {
        return this.getPokemonBy('name', name);
    }
}

module.exports = PokemonModel;

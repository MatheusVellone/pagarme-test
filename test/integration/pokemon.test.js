'use strict';

const chai = require('chai');
const server = require('./server');
const pokemonPayload = require('./payloads/pokemon.json');

const expect = chai.expect;

const basicCreation = (index) => {
    return (done) => {
        const pokemon = pokemonPayload.basic[index];
        server.post('/pokemon')
            .send(pokemon)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message', `Pokemon ${pokemon.name} (#${pokemon.number}) created`);
                done();
            });
    };
};

describe('Pokemon', () => {
    describe('Create', () => {
        it('Basic 1', basicCreation(0));
        it('Basic 2', basicCreation(1));
        it('Basic 3', basicCreation(2));

        it('Conflict Error', (done) => {
            const pokemon = pokemonPayload.basic[0];
            server.post('/pokemon')
                .send(pokemon)
                .end((err, res) => {
                    expect(res).to.have.status(409);
                    expect(res.body).to.have.property('message', 'This Pokemon already exists');
                    done();
                });
        });

        it('Validation Error', (done) => {
            const pokemon = pokemonPayload.error;
            server.post('/pokemon')
                .send(pokemon)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body).to.have.property('message', '1 validation errors');
                    done();
                });
        });
    });

    describe('Donate', () => {
        const quantity = Math.floor(Math.random() * 100);
        it('Donate some pokemons', (done) => {
            const pokemon = pokemonPayload.basic[0];
            server.put(`/pokemon/${pokemon.number}`)
                .send({
                    quantity,
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', `${quantity} pokemons donated. Thanks for your donation.`);
                    done();
                });
        });

        it('Check updated stock', (done) => {
            const pokemon = pokemonPayload.basic[0];
            server.get(`/pokemon/${pokemon.number}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.result).to.have.property('stock', pokemon.stock + quantity);
                    done();
                });
        });
    });

    describe('Show', () => {
        it('Basic', (done) => {
            const pokemon = pokemonPayload.basic[0];
            server.get(`/pokemon/${pokemon.number}`)
                .send(pokemon)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', `${pokemon.name} (#${pokemon.number}) data`);
                    done();
                });
        });

        it('Validation Error', (done) => {
            const pokemon = pokemonPayload.error;
            server.get(`/pokemon/${pokemon.number}`)
                .send(pokemon)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body).to.have.property('message', '1 validation errors');
                    done();
                });
        });
    });
});

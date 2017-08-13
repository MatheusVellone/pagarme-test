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
                    expect(res.body).to.have.property('message', '1 validation error');
                    done();
                });
        });
    });

    describe('Donate', () => {
        it('Donate single pokemon', (done) => {
            const pokemon = pokemonPayload.basic[0];
            server.put(`/pokemon/${pokemon.number}`)
                .send({
                    quantity: 1,
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', '1 pokemon donated. Thanks for your donation.');
                    done();
                });
        });

        const quantity = Math.floor(Math.random() * 100) + 2;
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
                    expect(res.body.result).to.have.property('stock', pokemon.stock + quantity + 1);
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
                    expect(res.body).to.have.property('message', '1 validation error');
                    done();
                });
        });
    });

    describe('List', () => {
        it('Basic', (done) => {
            server.get('/pokemon')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Listing pokemons');
                    expect(res.body).to.have.property('result')
                        .and.to.be.an('array');
                    expect(res.body).to.have.property('pagination')
                        .and.to.be.an('object');
                    expect(res.body.pagination).to.have.property('pages')
                        .and.to.be.an('number');
                    expect(res.body.pagination).to.have.property('total')
                        .and.to.be.an('number');
                    expect(res.body.pagination).to.have.property('currentPage')
                        .and.to.be.an('number');
                    done();
                });
        });
    });

    describe('Extinct', () => {
        it('Basic', (done) => {
            const pokemon = pokemonPayload.basic[2];
            server.delete(`/pokemon/${pokemon.number}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', `Pokemon #${pokemon.number} is now in extinction process and isn't available for purchasing`);
                    done();
                });
        });

        it('Validation Error', (done) => {
            const number = 152;
            server.delete(`/pokemon/${number}`)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body).to.have.property('message', '1 validation error');
                    done();
                });
        });
    });

    describe('Buy', () => {
        it('Basic single', (done) => {
            const pokemon = pokemonPayload.basic[1];
            const data = pokemonPayload.cardData;
            data.quantity = 1;

            server.post(`/pokemon/${pokemon.number}`)
                .send(data)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', '1 pokemon bought. Thanks.');
                    done();
                });
        });

        const quantity = Math.floor(Math.random() * 10) + 2;
        it('Basic multi', (done) => {
            const pokemon = pokemonPayload.basic[1];
            const data = pokemonPayload.cardData;
            data.quantity = quantity;

            server.post(`/pokemon/${pokemon.number}`)
                .send(data)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', `${quantity} pokemons bought. Thanks.`);
                    done();
                });
        });

        it('Not found', (done) => {
            const data = pokemonPayload.cardData;
            data.quantity = 1;

            server.post('/pokemon/151')
                .send(data)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message', 'The requested Pokemon does not exists');
                    done();
                });
        });

        it('Extinct', (done) => {
            const pokemon = pokemonPayload.basic[2];
            const data = pokemonPayload.cardData;
            data.quantity = 1;

            server.post(`/pokemon/${pokemon.number}`)
                .send(data)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message', 'You can\'t buy this pokemon because it is in extinction process. These can be the last 100 Squirtles out there.');
                    done();
                });
        });

        it('Out of stock', (done) => {
            const pokemon = pokemonPayload.basic[0];
            const data = pokemonPayload.cardData;
            data.quantity = 1000000000;

            server.post(`/pokemon/${pokemon.number}`)
                .send(data)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

        it('Check updated stock', (done) => {
            const pokemon = pokemonPayload.basic[1];
            server.get(`/pokemon/${pokemon.number}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.result).to.have.property('stock', pokemon.stock - quantity - 1);
                    done();
                });
        });
    });
});

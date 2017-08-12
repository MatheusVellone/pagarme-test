'use strict';

const SequelizeBaseRepository = require('./SequelizeBaseRepository');
const structure = require('./structures/pokemon');

// Extends o Repository do Sequelize pois e manipulado pelo Sequelize
// Se precisar mudar para DynamoDB ou MongoDB por exemplo, seria so alterar o
// extends (alem de implementar o Repository do Dynamo ou do Mongo)
class PokemonRepository extends SequelizeBaseRepository {
    constructor() {
        super(structure);
    }
}

module.exports = PokemonRepository;

[![Build Status](https://travis-ci.org/MatheusVellone/pagarme-test.svg?branch=master)](https://travis-ci.org/MatheusVellone/pagarme-test)
[![Coverage Status](https://coveralls.io/repos/github/MatheusVellone/pagarme-test/badge.svg?branch=master)](https://coveralls.io/github/MatheusVellone/pagarme-test?branch=master)

# Pagar.me - Matheus Vellone

Run `npm start` to start the API.

```bash
pagarme-test/
├── src/                 # Application source code
│   ├── Controller       # Application Controllers
│   ├── Exception        # Custom application Esceptions
│   ├── Model            # Application Models
│   ├── Repository       # Application Repositories
│   ├── Validator        # Application Validators
│   ├── utils            # Util functions split by 'type'
│   │   ├── date         # Date utils functions
│   │   └── log          # Log utils functions
│   └── routes.json      # App routes mapped to a controller action
│
├── test/                # Tests
│   ├── unit/            # Unit tests directory with the same src/ structure
│   └── functional/      # Functional tests
└── index.js             # Application entry point that starts the API server
```

## DEV env features
- [pre-commit](https://github.com/observing/pre-commit) to avoid commits with bad code to repository
- Code linting with [ESLint](http://eslint.org/)
- [Nodemon](https://nodemon.io/) to restart server on code change
- .env file
- Tests with [Mocha](https://mochajs.org/), assertion with [Chai](http://chaijs.com/api/bdd/) and coverage by [Istanbul](https://gotwarlost.github.io/istanbul/)
- [Nyan cat Test report](https://mochajs.org/#nyan)

## Application features
- First seen field = _created_at_
- Last seen field = _updated-at_
- Extinct field = _deleted_at_
- Custom Exceptions
- Simplified route declaration: declare routes in a json file
- Easily prefix a group of routes
- Easily map route to a controller action
- Automatic request validation using [Joi](https://github.com/hapijs/joi). Validates path, query string and body data with configured rules based on action name

## Files responsabilities
- Controllers: handle requests and return a promise to respond the request
- Models: handle all application logic
- Repositories: comunicates with the database to persist data. A repository can be written to a specific database, so the application can talk to any database.
- utils: bundle of util files

## Scripts
- `npm start`: start the application
- `npm test`: test the application
- `npm run lint`: lint the code. Before every commit, this command is executed
- `npm run deploy`

## Routes

- `GET /pokemon` List all pokemons with pagination
- `GET /pokemon/:number` Get information about a single pokemon
- `POST /pokemon` Create a pokemon
- `POST /pokemon/:number` Buy a pok
- `PUT /pokemon/:number` Donate a pokemon
- `DELETE /pokemon/:number` Put a pokemon in extinction process

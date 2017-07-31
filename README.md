[![Coverage Status](https://coveralls.io/repos/github/MatheusVellone/pagarme-test/badge.svg?branch=master)](https://coveralls.io/github/MatheusVellone/pagarme-test?branch=master)

# Pagar.me - Matheus Vellone

Run `npm start` to start the API.

```bash
pokemon/
├── src/                 # Código da aplicação
│   ├── Controller       # Controllers da aplicação
│   ├── Exception        # Exceções customizadas
│   ├── Model            # Models da aplicação
│   ├── Repository       # Repositories da aplicação
│   ├── Validator        # Validators da aplicação
│   ├── utils            # 
|   │   ├── date         # Funções de data
|   │   └── log          # Funções de log
│   └── routes.json      # Rotas da aplicação mapeadas para uma action do controller
│
├── test/                # Testes
│
└── index.js             # Ponto de entrada da aplicação que inicia o servidor
```

## DEV env features
- [pre-commit](https://github.com/observing/pre-commit) to avoid comits with bad code to repository
- Code linting with [ESLint](http://eslint.org/)
- [Nodemon](https://nodemon.io/) to restart server on code change
- .env file
- Tests with [Mocha](https://mochajs.org/), assertion with [Chai](http://chaijs.com/api/bdd/) and coverage by [Istanbul](https://gotwarlost.github.io/istanbul/)

## Application features
- First seen field = _created_at_
- Last seen field = _updated-at_
- Extinct field = _delete_at_
- Custom Exceptions
- Simplified route declaration: declare routes in a json file
- Easily prefix a group of routes
- Easily map route to a controller action
- Automatic request validation using [Joi](https://github.com/hapijs/joi). Validates path, query string and body data with configured rules based on action name

## Files responsabilities
- Controllers: handle requests and return a promise
- Models: handle all application logic
- Repositories: comunicates with the database to persist data
- utils: bundle of util files

## Scripts
- `npm start`: start the application
- `npm test`: test the application
- `npm run lint`: lint the code. Before every commit, this command is executed

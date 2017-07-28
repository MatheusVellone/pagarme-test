module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "script"
    },
    "extends": "airbnb-base",
    "rules": {
        "import/no-dynamic-require": [
            0
        ],
        "no-underscore-dangle": [
            0,
            {
                "allowAfterThis": true,
                "allowAfterSuper": true
            }
        ],
        "import/no-extraneous-dependencies": [
            "error",
            {
                "devDependencies": true
            }
        ],
        "no-param-reassign": [
            0
        ],
        "object-shorthand": [
            "warn"
        ],
        "arrow-body-style": [
            "warn",
            "always"
        ],
        "indent": [
            "error",
            4,
            {
                SwitchCase: 1
            }
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "no-console": [
            "error"
        ],
        "linebreak-style": [
            0
        ],
        "semi": [
            "error",
            "always"
        ],
        "max-len": [
            0,
            120,
            4
        ]
    }
};

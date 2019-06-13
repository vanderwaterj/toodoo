var OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
    env: {
        browser: true,
        es6: true,
        jquery: true
    },
    extends: 'airbnb-base',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        "global-require" : OFF,
        "import/no-extraneous-dependencies" : WARN,
        "indent" : [ ERROR, 4 ],
        "linebreak-style" : [ WARN, "windows" ],
        "max-len" : OFF,
        "no-eval" : OFF,
        "no-unused-vars" : WARN,
        "prefer-template" : WARN
    },
};

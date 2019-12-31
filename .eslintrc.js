module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['plugin:@typescript-eslint/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        "indent": ["error", 4, {"SwitchCase": 1}],
        "lines-between-class-members": "off",
        "space-before-blocks": "error",
        "keyword-spacing": "error",
        "space-in-parens": ["error", "never"],
        "quotes": ["error", "single", {"allowTemplateLiterals": true}],
        "prefer-template": "error",
        "spaced-comment": ["error", "always", {
            "line": {
                "markers": ["/"],
                "exceptions": ["-", "+"]
            },
            "block": {
                "markers": ["!"],
                "exceptions": ["*"],
                "balanced": true
            }
        }]
    },
};

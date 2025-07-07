import { defineConfig } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:react/recommended",
        "prettier",
    )),

    plugins: {
        react: fixupPluginRules(react),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            __PATH_PREFIX__: true,
            Atomics: "readonly",
            SharedArrayBuffer: "readonly",
        },

        ecmaVersion: 2021,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },

            parser: "@babel/eslint-parser",
            requireConfigFile: false,
        },
    },

    settings: {
        react: {
            version: "detect",
        },

        "import/resolver": {
            node: {
                extensions: [".js", ".jsx"],
            },
        },
    },

    rules: {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "no-use-before-define": "off",

        quotes: [2, "single", {
            avoidEscape: true,
        }],

        "react/jsx-filename-extension": ["error", {
            extensions: [".jsx"],
        }],

        "react/prop-types": "off",
        "react/no-danger": "off",
        "react/no-unescaped-entities": "off",
        "import/no-extraneous-dependencies": "off",

        "import/extensions": ["error", "ignorePackages", {
            js: "never",
            jsx: "never",
        }],
    },
}]);
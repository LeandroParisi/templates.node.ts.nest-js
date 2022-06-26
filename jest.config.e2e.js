const { compilerOptions } = require("./tsconfig.json");

const { pathsToModuleNameMapper } = require("ts-jest/utils");

module.exports = {
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: ".",
    testEnvironment: "node",
    testRegex: ".e2e.test.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>",
    }),
};

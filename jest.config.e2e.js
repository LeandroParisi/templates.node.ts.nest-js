const { compilerOptions } = require("./tsconfig.json");

const { pathsToModuleNameMapper } = require("ts-jest");

module.exports = {
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: ".",
    testEnvironment: "node",
    testRegex: ".e2e.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>",
    }),
};

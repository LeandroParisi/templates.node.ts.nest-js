const { compilerOptions } = require("./tsconfig.json");

const { pathsToModuleNameMapper } = require("ts-jest/utils");

module.exports = {
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/__tests__/__mocks__/",
        "<rootDir>/__tests__/__fixture__/",
        "<rootDir>/src/assets/",
        "<rootDir>/src/configs/",
        "<rootDir>/src/utils/",
        "<rootDir>/src/domains/",
        "<rootDir>/src/main.ts",
        "<rootDir>/src/app.ts",
        "/json/",
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    testPathIgnorePatterns: [
        "\\.snap$",
        "<rootDir>/node_modules/",
        "<rootDir>/__tests__/__mocks__/",
        "<rootDir>/__tests__/data-builders/",
        "<rootDir>/__tests__/__fixture__/",
    ],
    cacheDirectory: ".jest/cache",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>",
    }),
};

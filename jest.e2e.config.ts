export default {
    moduleFileExtensions:['js','json','ts'],
    testRegex: '.*\\.e2e-spec\\.ts$',
    transform:{
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    collectCoverageFrom:['**/*.(t|j)s'],
    coverageDisrectory: '../coverage',
    testeEvironment:'node',
}
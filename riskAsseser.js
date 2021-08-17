const depcheck = require('depcheck')


const options = {
    ignoreBinPackage: false, // ignore the packages with bin entry
    skipMissing: false, // skip calculation of missing dependencies
    parsers: {
        // the target parsers
        '**/*.js': depcheck.parser.es6,
        '**/*.jsx': depcheck.parser.jsx,
    },
    detectors: [
        // the target detectors
        depcheck.detector.requireCallExpression,
        depcheck.detector.importDeclaration,
    ],
    specials: [
        // the target special parsers
        depcheck.special.eslint,
        depcheck.special.webpack,
    ],
    package: {
        peerDependencies: {},
        optionalDependencies: {},
    },
};

async function asses(name) {
    console.log(`assessing ${name}` )
    return await depcheck(`./repos/${name}`, options)
}

module.exports = {
    asses
}
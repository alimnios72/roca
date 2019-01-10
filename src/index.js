const brs = require('brs');
const glob = require('glob');
const path = require('path');

function findBrsFiles() {
    return glob.sync("source/**/*.brs");
}

function findTestFiles() {
    return glob.sync("tests/**/*.test.brs");
}

async function runTest(sourceFiles, testFile) {
    let rocaBrs = path.join(__dirname, "..", "resources", "roca.brs");

    try {
        const result = await brs.execute([ rocaBrs, testFile, ...sourceFiles ]);
    } catch(e) {
        console.error("Interpreter found an error: ", e);
        process.exit(11);
    }
    process.exit(0);
}

module.exports = function(testFile) {
    const sourceFiles = findBrsFiles();
    const testsFiles = findTestFiles();
    testsFiles.map( (test) => runTest(sourceFiles, testsFiles))
}

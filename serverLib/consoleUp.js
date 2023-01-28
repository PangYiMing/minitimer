const { timeFormat } = require('./format');

function sourceFileAndCodeLine(n) {
    var stack = new Error().stack;
    var ss = stack.split('\n    at');
    //   console.log('\n\n\n\n---------\n', 'sourceFileAndCodeLine(3)', stack, ss, '\n\n\n\n----------');
    return ss[n].trim();
}
console.errors = function (...args) {
    let path = getPath();
    return console.error(timeFormat(null), path, ...args);
};
console.logs = function (...args) {
    let path = getPath();
    return console.log(timeFormat(null), path, ...args);
};

function getPath() {
    let path = sourceFileAndCodeLine(4).split('(')[1];
    if (typeof path === 'string') {
        path = path.replace(')', ':');
    } else {
        path = sourceFileAndCodeLine(4);
    }
    return path;
}

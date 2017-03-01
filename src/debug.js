/**
 * Created by pkim on 2/28/17.
 */

let logger = require('debug')('qa-test');
let winston = require('winston');
winston.level = 'debug';


let myCustomLevels = {
    levels: {
        foo: 0,
        bar: 1,
        baz: 2,
        foobar: 3,
    },
    colors: {
        foo: 'blue',
        bar: 'green',
        baz: 'yellow',
        foobar: 'red',
        debug: 'yellow',
        info: 'green'
    }
};

let customLevelLogger = new (winston.Logger)({ levels: myCustomLevels.levels });
customLevelLogger.level = 'foo';

winston.addColors(myCustomLevels.colors);

//customLevelLogger.foobar('some foobar level-ed message');


module.exports.foo = function(msg) {
    customLevelLogger.info(msg);
}

module.exports.debug = function(msg) {
   // logger(msg);
    winston.debug(msg);
};

module.exports.info = function(msg) {
    winston.info(msg);
};

module.exports.warn = function(msg) {
    winston.warn(msg);
};

module.exports.error = function(msg) {
    winston.info(msg);
};

module.exports.setLevel = function(level) {
    if (level.match(/^(silly|debug|verbose|info|warn|error)$/)) {
        winston.level = level;
    }
    else {
        winston.error(`Invalid level - ${level}.`);
        throw `InvalidLevel`;
    }
};




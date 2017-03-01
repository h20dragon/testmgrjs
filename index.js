/**
 * The main user facing module. Exports primary
 * public API and provides convenience assessors to certain sub-modules.
 */

'use strict';

const testmgr = require('./lib/testmgr');
const testcase = require('./lib/testcase');
const testcomposite = require('./lib/testcomposite');
const debug = require('./lib/debug');


exports.testmgr = testmgr;
exports.testcase = testcase;
exports.requirement = testcomposite;
exports.debug = debug;

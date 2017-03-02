/**
 * The main user facing module. Exports primary
 * public API and provides convenience assessors to certain sub-modules.
 */

'use strict';

const tmgr = require('./lib/testmgr');
const TestMgr = tmgr.TestMgr;
let testmanager = null;


function createTestMgr(name) {
    testmanager = new TestMgr(name);
    return testmanager;
}


function getTestMgr(name) {
    return testmanager;
}


exports.createTestMgr = createTestMgr;
exports.getTestMgr = getTestMgr;

// TODO
// - Add support for controlling logging levels.


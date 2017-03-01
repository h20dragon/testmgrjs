/**
 * Created by pkim on 2/25/17.
 */


import TestCase from './testcase';
import TestMgr from './testmgr';
let logger = require('./debug');

logger.setLevel('debug');

logger.debug('Start');

let testmanager = new TestMgr('main');


let tc = new TestCase({id: 'TC01'});
tc.assert( { 'description': 'Verify element displayed.', result: true });
tc.assert( { 'description': 'Verify element value.', result: true });
tc.print();

testmanager.getReq('REQ-000').testcase(tc);

testmanager.getReq('REQ-100').testcase('Home Page').assert( { description: 'assert menu', result: true });
testmanager.getReq('REQ-100').testcase('Home Page').assert( { description: 'assert menu2', result: true });
testmanager.getReq('REQ-100').testcase('Home Page').assert( { description: 'assert menu3', result: true });
//testmanager.getReq('REQ-000').print();

testmanager.getReq('REQ-200').addReq('SubReq').testcase('Logon Page').assert( { description: 'verify login', result: true });
testmanager.getReq('REQ-200').addReq('SubReq2').testcase('Logon Page2').assert( { description: 'verify logoff', result: true });

testmanager.print();

logger.info(`RESULT(REQ-000)=> ${testmanager.getReq('REQ-000').result()}`);
logger.info(`RESULT(REQ-100)=> ${testmanager.getReq('REQ-100').result()}`);
logger.info(`RESULT(REQ-200)=> ${testmanager.getReq('REQ-200').result()}`);
logger.info(`RESULT => ${testmanager.result()}`);

logger.debug('Completed');




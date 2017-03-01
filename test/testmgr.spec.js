
import chai from 'chai';
import {expect} from 'chai';
import TestCase from '../lib/testcase';
import TestComposite from '../lib/testcomposite';
import TestMgr from '../lib/testmgr';
let util = require('util');

let should = chai.should;


describe('TestMgr', () => {


    it('should create object', () => {
      let tm = new TestMgr('Example');
      tm.should.be.an.instanceOf(TestMgr);
    });

    it('should add requirement if doesnt exist', () => {
        let testmgr = new TestMgr('TestManager');

        let req=testmgr.getReq('XYZ');
        console.log(`req => ${util.inspect(req)}`);
        req.should.be.an.instanceOf(TestComposite) && req.getName().should.be.equal('XYZ');
    })

    it('should create composite with string parm', () => {
      let testmgr = new TestMgr('TestManager');
      testmgr.addRequirement('Example-Req-123');
      let req = testmgr.getReq('Example-Req-123');
      console.log(`req => ${util.inspect(req)}`);
      req.should.be.an.instanceOf(TestComposite) && req.getName().should.be.equal('Example-Req-123');
    })

    it('should create composite with hash parm', () => {
        let testmgr = new TestMgr('TestManager');
        testmgr.addRequirement( { name: 'REQ-NAME-ABC' });
        let req = testmgr.getReq('REQ-NAME-ABC');
        console.log(`req => ${util.inspect(req)}`);
        req.should.be.an.instanceOf(TestComposite) && req.getName().should.be.equal('REQ-NAME-ABC');
       // let tm = new TestComposite({id: 'TC_00', name: 'TestComposite' });
    })





    it('should add 1 testcase', () => {
        let tc = new TestCase( { 'id': 'TC-000', 'description': 'Test Case One'});
        let testmgr = new TestMgr('TestManager');
        let req=testmgr.getReq('REQ_000');
        req.add(tc);

        req.print();

        req.should.be.an.instanceOf(TestComposite) && req.totalTestCases().should.be.equal(1);
    })

    it('should add 1 testcase with func prog.', () => {
      let tc = new TestCase( { 'id': 'TC-000', 'description': 'Test Case One'});
      let testmgr = new TestMgr('TestManager');
      testmgr.getReq('REQ_000').add(tc);
      testmgr.getReq('REQ_000').print();
      testmgr.getReq('REQ_000').should.be.an.instanceOf(TestComposite) && testmgr.getReq('REQ_000').totalTestCases().should.be.equal(1);
    })

    it('should add 1 testcase with tc with 1 assert', () => {
      let tc = new TestCase( { 'id': 'visible_when', 'description': 'Test Case One'});
      let testmgr = new TestMgr('TestManager');
      let reqid = 'REQ-123_XYZ'
      let tc2=testmgr.getReq(reqid).add(tc);
      testmgr.getReq(reqid).tc('visible_when').assert({'description': 'Passed assertion', 'result': true });
      testmgr.getReq(reqid).tc('visible_when').assert({'description': 'Failed assertion', 'result': false });
      testmgr.getReq(reqid).tc('visible_when').assert({'description': 'Failed assertion', 'result': false });


      testmgr.getReq(reqid).testcase('TC-001').assert({'description': 'Failed assertion', 'result': false });

      console.log('=============== START =====================');
      testmgr.getReq(reqid).print();
      console.log('================== END ==================');

      tc2.should.be.an.instanceOf(TestCase) &&
        testmgr.getReq(reqid).tc('visible_when').should.be.an.instanceOf(TestCase) &&
          testmgr.getReq(reqid).tc('visible_when').getId().should.be.equal('visible_when');

    //  testmgr.getReq('REQ_000').should.be.an.instanceOf(TestComposite) && testmgr.getReq('REQ_000').totalTestCases().should.be.equal(1);
    })


    describe('Requirements within requiements', () => {

        it('should create composite with multiple composites', () => {
            let testmgr = new TestMgr('TestManager');
            testmgr.addRequirement( { name: 'REQ-NAME-ABC' });
            let req = testmgr.getReq('REQ-NAME-ABC').add( new TestComposite({ name: 'SubRequirement'}));
            console.log(`req => ${util.inspect(req)}`);
            req.should.be.an.instanceOf(TestComposite) && req.getName().should.be.equal('SubRequirement');
            // let tm = new TestComposite({id: 'TC_00', name: 'TestComposite' });
        });


        it('should create composite with multiple composites fcn', () => {
            let testmgr = new TestMgr('TestManager');
            testmgr.addRequirement( { name: 'REQ-NAME-ABCD' }).testcase({'id': `TC_ID-Example`, 'name': 'TC01_Name', description: 'Testcase example 1 with many asserts.'});
            let req = testmgr.getReq('REQ-NAME-ABCD').addReq('SubRequirement');
            testmgr.getReq('REQ-NAME-ABCD').print();
            req.should.be.an.instanceOf(TestComposite) && req.getName().should.be.equal('SubRequirement');
        });


        it('should create composite with multiple composites fcn', () => {
            let testmgr = new TestMgr('TestManager');
            testmgr.addRequirement( { name: 'REQ-NAME-ABCD' }).testcase({'id': `TC_ID-Example`, 'name': 'TC01_Name', description: 'Testcase example 1 with many asserts.'});
            let req = testmgr.getReq('REQ-NAME-ABCD').addReq('SubRequirement').addReq('Req.0.0.1')

            req.testcase({id: 'TC_00000', description: 'test case example'}).assert({'description': 'Failed assertion', 'result': false });
            req.testcase({id: 'TC_00001', description: 'test case example 2'}).assert({'description': 'Passed assertion', 'result': true });

            testmgr.getReq('REQ-NAME-ABCD').print();
            req.should.be.an.instanceOf(TestComposite) && req.getName().should.be.equal('Req.0.0.1');
        });


    });

});

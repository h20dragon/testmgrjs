
import chai from 'chai';
import {expect} from 'chai';
import TestCase from '../lib/testcase';
import TestMgr from '../lib/testmgr';

let should = chai.should;


describe('TestCase', () => {

   it('should create testcase', () => {
      let tc = new TestCase( { 'name': 'TC001' });
      tc.should.be.an.instanceOf(TestCase);
   });

    it('should have passed testcase', () => {
        let tc = new TestCase({'id': 'TC-Failed', 'name': 'TC-01'});
        tc.assert({'description': 'Failed assertion', 'result': true });
        tc.report();
        tc.passed().should.equal(true);
    });

    it('should have failed testcase', () => {
      let tc = new TestCase({'id': 'TC-Failed', 'name': 'TC-01'});
      tc.assert({'description': 'Failed assertion', 'result': false });
      tc.report();
      tc.passed().should.equal(false);
    });

   it('should add an assertion to tc', () => {
    let tc = new TestCase({'id': 'TC-000', 'name': 'TC01'});
    tc.assert( { 'description': 'Assertion 1', 'result': true });
    tc.print();

    tc.count().should.be.equal(1) && tc.totalAssertions().should.be.equal(1);
   });

    it('should add add assertion to tc', () => {
     let tc = new TestCase({'id': `TC_ID-Example`, 'name': 'TC01_Name', description: 'Testcase example 1 with many asserts.'});

     let total=100
     for (var i = 0; i< total; i++) {
         tc.assert({'description': `Assertion ${i}`, 'result': (i % 2)===0 });
     }

     tc.assert({'description': `Skipped assertion`, 'result': undefined});
     total++;

     console.log('==== TestCase ====');
     console.log(tc.report());
     console.log('==== end TestCase ====');

     tc.count().should.be.equal(total) && tc.totalAssertions().should.be.equal(total) &&
         tc.totalPassed().should.be.equal(Math.floor(total/2)) &&
         tc.totalFailed().should.be.equal(Math.floor(total/2)) &&
         tc.totalSkipped().should.be.equal(1) &&
         tc.passed().should.equal.false;
    });




});


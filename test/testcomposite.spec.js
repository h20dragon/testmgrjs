
import chai from 'chai';
import {expect} from 'chai';
import TestCase from '../lib/testcase';
import TestComposite from '../lib/testcomposite';
import TestMgr from '../lib/testmgr';

let should = chai.should;


describe('TestComposite', () => {

    it('should create object', () => {
      let tm = new TestComposite({id: 'TC_00', name: 'TestComposite' });
      tm.should.be.an.instanceOf(TestComposite);
    });

    it('should have a requirement with 1 sub-requirement', () => {
        let tm = new TestComposite('Requirement 1');
        tm.add(new TestComposite('Req 1.A'));
        tm.print();
    })



});

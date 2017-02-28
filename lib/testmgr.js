
import TestCase from './testcase';
import TestComposite from './testcomposite';
let util = require('util');

export default class TestMgr {


    constructor(name) {
        this.name = name;
        this.current_rec = { req: '__TBD__', tc: '__TBD__'};
        this.filename = name;
        this.id_under_test=null;
        this.verbose = true;
        this.test_list = new Array;
        this.req_list = new Array;
        this.requirements = new Array;
    }


    setCurrentReq(r) {
        this.current_rec.req=r;
    }

    getCurrentReq() {
        return this.current_rec.req;
    }

    getCurrentTC() {
        return this.current_rec.tc;
    }

    setCurrentTC(t) {
        this.current_rec.tc=t;
    }

    setDescription(s) {
        this.description = s;
    }

    getDescription() {
        return this.description;
    }

    setup(description) {
        this.setDescription(description);
        this.completed=false;
    }

    completed() {
        this.completed=true;
    }

    isCompleted() {
        return this.completed;
    }

    getId() {
        return this.id_under_test;
    }

    getName() {
        return this.name;
    }

    getReq(req) {
        console.log(`== getReq(${req}) ==`);

        for (let composite of this.requirements) {
            console.log(`| name: ${composite.getName()} : ${util.inspect(composite)}`)
            if (composite.name === req) {
                console.log(`>>> FOUND : ${util.inspect(composite)} <<<<`);
                return composite;
            }
        }

        return this.addRequirement(req);
    }

    addRequirement(req) {
        console.log(`== testmgr::addRequirement(${util.inspect(req)}) ==`);
        let length = this.requirements.push(new TestComposite(req));
        return this.requirements[length - 1];
    }

    addReq(r) {
        let length=this.req_list.push(r);
        return this.req_list[length - 1];
    }

    add(rc, description) {
        this.test_list.push( { rc: rc, description: description })
        return rc;
    }



    addTestCase(tc) {
        if (tc instanceof TestCase) {
            console.log('==== Add TestCase Object ====');
        } else {
            console.log('=== Create TestCase and then add it ====');
        }
    }

}

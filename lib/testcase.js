
import AbstractTest from './abstracttest';

let logger = require('./debug');

export default class TestCase extends AbstractTest {

    constructor(opts) {
        super(opts);
      //  this.id = opts.id;
      //  this.name = opts.name;
        this.reqid = opts.reqid;
        if (opts.hasOwnProperty('description')) {
            this.description = opts.description;
        }
        this.assertions = new Array;
        this.result = null;
        this.nPassed=0;
        this.nFailed=0;
        this.nSkipped=0;
    }

    child(name) {
        if (name===this.id) {
            return this;
        }

        return null;
    }

    getDescription() {
        return this.description;
    }

    setDescription(d) {
        this.description = d;
    }

    count() {
        return this.assertions.length;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.id;
    }

    passed() {
      return this.nPassed > 0 && this.nFailed===0;
    }

    setParent(parent) {
        this.parent=parent;
    }

    totalFailed() {
        return this.nFailed;
    }
    totalPassed() {
        return this.nPassed;
    }

    totalSkipped() {
        return this.nSkipped;
    }

    totalAssertions() {
        return this.count();
    }

    print() {
        let s = this.report();
        console.log(s);
    }

    report() {
        let s='';
        s+=`TC: ${this.id}.  ${this.description}   : Result: ${this.passed()}\n`;
        s+=`  o name: ${this.name}\n`;
        s+=`  o #assertions: ${this.totalAssertions()}\n`;
        s+=`  o passed    : ${this.totalPassed()}\n`;
        s+=`  o failed    : ${this.totalFailed()}\n`;
        s+=`  o skipped   : ${this.totalSkipped()}\n`;

        let i = 0;
        for (let a of this.assertions) {
            s+=`| ${i}. ${a.description} : ${a.result}\n`;
            i++;
        }

        return s;
    }


    add(opts) {
        this.assert(opts)
    }

    //
    // opts.description
    // opts.result
    //
    assert(opts) {
        let { result } = opts;
        logger.debug(`Assert : TestCase (${this.id}) - ${opts.description} : ${result}`);
        this.assertions.push( opts );
        if (result===undefined) {
            this.nSkipped++;
        } else if (result===true) {
            this.nPassed++;
        } else if (result===false) {
            this.nFailed++;
        }
    }

}

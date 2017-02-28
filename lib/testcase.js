
import AbstractTest from './abstracttest';

export default class TestCase extends AbstractTest {

    constructor(opts) {
        super(opts);
      //  this.id = opts.id;
      //  this.name = opts.name;
        this.reqid = opts.reqid;
        this.description = opts.description;
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
        this.report();
    }

    report() {
        console.log(`Testcase: ${this.id}   => passed: ${this.passed()}`);
        console.log(`o name: ${this.name}`);
        console.log(`o descripton: ${this.description}`);
        console.log(`o #assertions: ${this.totalAssertions()}`);
        console.log(`  o passed    : ${this.totalPassed()}`);
        console.log(`  o failed    : ${this.totalFailed()}`);
        console.log(`  o skipped   : ${this.totalSkipped()}`);

        let i = 0;
        for (let a of this.assertions) {
            console.log(`| ${i}. ${a.description} : ${a.result}`);
            i++;
        }
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
        console.log(`Assert : TestCase (${this.id}) - ${opts.description} : ${result}`);
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

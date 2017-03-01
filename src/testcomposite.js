
import AbstractTest from './abstracttest';
import TestCase from './testcase';

let logger = require('./debug');
let util = require('util');

export default class TestComposite extends AbstractTest {


  constructor(opt) {
      super(opt);
      this.sub_tasks = new Array;
      this.full_path = opt.name;
      this.parent = null;
  }

  //
  addSubTask(task) {
      logger.debug(`== testmgr::addSubTask(${util.inspect(task)} ==`)
      this.sub_tasks.push(task);
      task.setParent(this);
      return task;
  }

  add(r) {
      logger.debug(`== testmgr::add(${util.inspect(r)} ==`);
      return this.addSubTask(r);
  }

  addReq(r) {
      if (typeof r === 'string') {
        return this.add(new TestComposite({name: r}));
      }
      else if (r instanceof TestComposite) {
        return this.add(r);
      }
      else {
          throw 'addReq-UnknownType';
      }
  }

  child(name) {
      logger.debug(`== testcomposite::child(${name})`);

      for (let task of this.sub_tasks) {
          let _c=task.child(name);
          if (_c!==null) {
              logger.debug(`| found child : ${_c.getId()}`);
              return _c;
          }
      }

      return null;
  }

  getName() {
      return this.name;
  }

  getParent() {
      return this.parent;
  }

  getParents() {
      let _parents="";
      if (this.parent!==null) {
          _parents = this.parent.getName();
      }

      let _p=this.parent;
      while (_p && _p.getParent()) {
          _parents = `${_p.getParent().getName()} => ${_parents}`;
          _p=_p.getParent();
      }

      return _parents;
  }



  print() {
      logger.debug(`========== testcomposite::print() - Requirement: ${this.getName()} ==========`);
      console.log(`========== Requirement: ${this.getName()} ==========`);
      for (let task of this.sub_tasks) {
          if (task instanceof TestComposite) {
             // console.log(`= Requirement: ${task.name} =`);
              task.print();
          }
          else if (task instanceof TestCase) {
              console.log(task.report());
          }
          else {
              throw 'Unknown type';
              task.print();
          }

      }

      console.log(`========== end print() for Requirement: ${this.getName()} ==========`);
  }

  removeSubTask(task) {
      logger.debug('== removeSubTask - TBD ==');
  }


  result() {
      let rc=true;

      for (let task of this.sub_tasks) {
          if (task instanceof TestComposite) {
              rc=rc && task.result()
          }
          else if (task instanceof TestCase) {
              rc = rc && task.passed()
          }
          else {
              throw 'Unknown type';
              task.print();
          }
      }

      return rc;
  }


  setParent(parent) {
      this.parent=parent;
  }

  tc(name) {
      return this.child(name);
  }


  // Retrieve the specified testcase, otherwise
  // if it doesn't exist, create the TestCase and add it.
  //
  testcase(opt) {
      let tc=null;

      if (typeof opt === 'string') {
          opt={id: opt};
      }

      tc = this.child(opt.id);

      if (tc===null) {

          if (opt instanceof TestCase) {
              tc = this.add(opt);
          }
          else {
              let _tc = new TestCase(opt);
              tc = this.add(_tc);
          }
      }

      return tc;
  }

  totalTestCases() {
      return this.sub_tasks.length;
  }

  getResult() {
      let rc=true;
      this.sub_tasks.forEach(function(task) {
          rc = rc && task.getResult();
      });
      return rc;
  }

}

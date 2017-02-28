
import AbstractTest from './abstracttest';
import TestCase from './testcase';

let util = require('util');

export default class TestComposite extends AbstractTest {


  constructor(opt) {
      super(opt);
      this.sub_tasks = new Array;
      this.full_path = opt.name;
      this.parent = null;
  }

  child(name) {
      console.log(`== testcomposite::child(${name})`);

      for (let task of this.sub_tasks) {
          let _c=task.child(name);
          if (_c!==null) {
              console.log(`| found child : ${_c.getId()}`);
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


  //
  addSubTask(task) {
      console.log(`== testmgr::addSubTask(${util.inspect(task)} ==`)
      this.sub_tasks.push(task);
      task.setParent(self);
      return task;
  }

  add(r) {
      console.log(`== testmgr::add(${util.inspect(r)} ==`);
      return this.addSubTask(r);
  }


  print() {
      console.log(`========== testcomposite::print() - Requirement: ${this.getName()} ==========`);

      for (let task of this.sub_tasks) {
          if (task instanceof TestComposite) {
              console.log(`= Requirement: ${task.name} =`)
          }
          task.print();
      }

      console.log(`========== end print() for Requirement: ${this.getName()} ==========`);
  }

  removeSubTask(task) {
      console.log('== removeSubTask - TBD ==');
  }

  setParent(parent) {
      this.parent=parent;
  }

  tc(name) {
      return this.child(name);
  }



  testcase(opt) {
      let tc = this.child(opt.id);

      if (tc===null) {
          let _tc = new TestCase(opt);
          tc=this.add(_tc);
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

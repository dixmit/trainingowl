// In this example, we show how components can be defined and created.
import { Component, useEnv, useSubEnv, useState, mount } from "@odoo/owl";

export class Child extends Component {
  static template = "oca_training.Child";
  static props = { id: Number, unset: Function };

  setup() {
    this.editMode = useState({ value: true });
    this.title = useState({ value: "Title" });
    this.counter = useState({ value: 0 });
    this.init();
  }
  init() {
    switch (this.props.id) {
      case 0:
        this.title.value = "Days without nuclear breakdown";
        this.counter.value = 23;
        this.editMode.value = false;
        break;
      case 1:
        this.title.value = "Days with no new requirements";
        break;
      case 2:
        this.title.value = "Days without bugs";
        this.editMode.value = false;
        break;
      case 3:
        this.title.value = "Days where I learned new things";
        this.counter.value = 20000000;
        this.editMode.value = false;
        break;
      case 4:
        this.title.value = "People angry with IT team";
        this.counter.value = 1234123545;
        this.editMode.value = false;
        break;
    }
  }
  edit() {
    this.editMode.value = true;
  }
  save() {
    this.editMode.value = false;
  }
  del() {
    this.props.unset();
  }
  increment() {
    this.counter.value += 1;
  }
}

export class Parent extends Component {
  static template = "oca_training.Parent";
  static components = { Child };
  setup() {
    this.state = useState({ children: [0, 1, 2, 3, 4] });
  }

  addChild() {
    this.state.children.push(null);
  }
  initChild(id) {
    this.state.children[id] = id;
  }
  unsetChild(id) {
    this.state.children[id] = null;
  }
}

mount(Parent, document.body, { templates: TEMPLATES, dev: true });

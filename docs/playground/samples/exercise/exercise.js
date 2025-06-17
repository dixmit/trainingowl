import { Component, useState, mount } from "@odoo/owl";

class Counter extends Component {
  static props = [
    "counter",
    "onRename",
    "onIncrement",
    "onReset",
    "onRemove",
  ];
  static template = "training_oca.Counter";

  rename = (ev) => {
    this.props.onRename(this.props.counter.id, ev.target.value);
  };
  increment = () => this.props.onIncrement(this.props.counter.id);
  reset     = () => this.props.onReset(this.props.counter.id);
  remove    = () => this.props.onRemove(this.props.counter.id);
}

export class Parent extends Component {
  static components = { Counter };
  static template = "training_oca.Parent";

  setup() {
    this.state = useState({ counters: [], newName: "" });
    this.nextId = 1;
  }

  addCounter = () => {
    const name = this.state.newName.trim();
    if (!name) return;
    this.state.counters = [
      ...this.state.counters,
      { id: this.nextId++, name, value: 0 },
    ];
    this.state.newName = "";
  };

  rename    = (id, name) =>
    (this.state.counters = this.state.counters.map(c =>
      c.id === id ? { ...c, name } : c
    ));
  increment = (id) =>
    (this.state.counters = this.state.counters.map(c =>
      c.id === id ? { ...c, value: c.value + 1 } : c
    ));
  reset     = (id) =>
    (this.state.counters = this.state.counters.map(c =>
      c.id === id ? { ...c, value: 0 } : c
    ));
  remove    = (id) =>
    (this.state.counters = this.state.counters.filter(c => c.id !== id));
  resetAll  = () =>
    (this.state.counters = this.state.counters.map(c => ({ ...c, value: 0 })));
  removeAll = () => (this.state.counters = []);
}

mount(Parent, document.body, { templates: TEMPLATES, dev: true });

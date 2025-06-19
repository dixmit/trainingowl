// In this example, we show how components can be defined and created.
import { Component, onWillStart, useSubEnv, useState, mount } from "@odoo/owl";

class Counter extends Component {
    static template="oca_training.Counter";
    static props = {name:String, value: Number, id: Number}
    setup() {
        this.state = useState({
            edit: false,
            name: this.props.name,
            value: this.props.value,
        });
    }
    toggleEdit() {
        if (this.state.edit) {
            this.env.updateValues(this.props.id, this.state.name, parseInt(this.state.value, 10))
        }
        this.state.edit = !this.state.edit;
    }
    incrementCounter() {
        this.env.incrementCounter(this.props.id);
    }
    removeCounter() {
        this.env.removeCounter(this.props.id)
    }
}

class CounterDashboard extends Component {
   static template = "oca_training.CounterDashboard";
   static components = { Counter }
   setup() {
       this.id = 1;
       this.counters = useState({});
       onWillStart(() => {this.addCounter()})
       useSubEnv({
        incrementCounter: this.incrementCounter.bind(this),
        removeCounter: this.removeCounter.bind(this),
        updateValues: (id, name, value) => {
            if (this.counters[id]) {
                this.counters[id].name = name;
                this.counters[id].value = value;
            }
        },
    });
   }
   addCounter() {
       const newId = this.id++;
       this.counters[newId] = {
           id: newId,
           name: "New Counter",
           value: 0,
       };
   }
   resetAll() {
       for (const counterId in this.counters) {
           this.counters[counterId].value = 0;
       }
   }
   removeCounter(id) {
       if (this.counters[id]) {
           delete this.counters[id];
       }
   }
   incrementCounter(id) {
       if (this.counters[id]) {
           this.counters[id].value++;
       }
   }
}


mount(CounterDashboard, document.body, { templates: TEMPLATES, dev: true });

// In this example, we show how components can be defined and created.
import { Component, onWillStart, useSubEnv, useState, mount } from "@odoo/owl";

class Counter extends Component {
    static template="oca_training.Counter";
    static props = {removeCounter: Function, increaseCounter: Function, resetCounter: Function, counterId: String, slots: Object};
}

class CounterDashboard extends Component {
    static template = "oca_training.CounterDashboard";
    static components = { Counter }
    setup() {
        this.id = 1;
        this.counters = useState({});
        onWillStart(() => {this.addCounter()})
    }
    addCounter() {
        const newId = this.id++;
        this.counters[newId] = {
            id: newId,
            name: "New Counter",
            value: 0,
        };
    }
    resetCounter(id) {
        if (this.counters[id]) {
            this.counters[id].value = 0;
        }
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

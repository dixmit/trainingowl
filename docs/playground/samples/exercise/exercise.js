// In this example, we show how components can be defined and created.
import { Component, useEnv, useSubEnv, useState, mount } from "@odoo/owl";

export class Child extends Component {
    static template = 'oca_training.Child';
    static props = {id: Number};
    
   setup() {
       this.editMode = useState({value: true})
       this.title = useState({value: ""})
       this.counter = useState({ value: 0 });
   }
   edit() {
       this.editMode.value = true
   }
   save() {
       this.editMode.value = false
   }
}

export class Parent extends Component {
   static template = 'oca_training.Parent';
   static components = { Child };
   setup() {
       const INITIAL_SIZE = 5
       this.state = useState({children: new Array(INITIAL_SIZE)});
   }
   
   addChild() {
       this.state.children.push(undefined)
   }
   initChild(id) {
       this.state.children[id] = id
   } 
   
}

mount(Parent, document.body, { templates: TEMPLATES, dev: true });

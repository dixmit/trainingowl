// In this example, we show how components can be defined and created.
// Done by Benedikt Zimmer
import { Component, useState, useSubEnv, mount } from "@odoo/owl";

class Counter extends Component {
   static template = "oca_training.Counter";
   setup() {
        this.state = useState({
           'count': 0,
           'name': 'unnamed counter',
           'editing_name': true,
           'editing_count': false
       })
       this.env.registerChild(this);
   }
   
   increment(){
       this.state.count++;
   }
   reset(){
       this.state.count = 0;
   }
   toggle_edit_name(){
       this.state.editing_name = !this.state.editing_name;
   }
   toggle_edit_count(){
       this.state.editing_count = !this.state.editing_count;
   }
}

class Dashboard extends Component {
   static template = "oca_training.Dashboard";
   static components = { Counter };
   setup() {
       this.state = useState({
           counter_children: [{id: 1}],
           i: 1,
       });
       this.child_objects = [];  // dont do useState() here because it goes into an infinite loop
       useSubEnv({
           registerChild: this.registerChild.bind(this)
       });
   }
   
   registerChild(element){
       this.child_objects.push(element);
   }
   
   addCounter() {
       this.state.i++;
       this.state.counter_children.push({ id: this.state.i });
   }
   resetAll() {
       for(var i=0; i<this.child_objects.length; i++){
           this.child_objects[i].reset();
       }
   }
   removeAll() {
       this.state.counter_children = [];
       this.child_objects = [];
   }
}

mount(Dashboard, document.body, { templates: TEMPLATES, dev: true });

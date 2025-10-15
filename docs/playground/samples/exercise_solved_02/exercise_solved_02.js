// In this example, we show how components can be defined and created.
// Done by Benedikt Zimmer
import { Component, useState, useSubEnv, useRef, mount, onMounted, onWillUnmount } from "@odoo/owl";

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
        this.nameRef = useRef("nameRef");
        this.countRef = useRef("countRef");
        onMounted(() => {
            this._onClick = this.onClick.bind(this);
            window.addEventListener("click", this._onClick);
            this.nameRef.el.focus();
        });
        onWillUnmount(() => {
            window.removeEventListener("click", this._onClick);
        });
    }
    onClick(ev){
        if (!this.nameRef.el.contains(ev.target) && this.state.editing_name){
            this.state.editing_name = false;
        }
        if (!this.countRef.el.contains(ev.target) && this.state.editing_count){
            this.state.editing_count = false;
        }
    }
    increment(){
        this.state.count++;
    }
    reset(){
        this.state.count = 0;
    }
    toggle_edit_name(){
        this.state.editing_name = true;
    }
    toggle_edit_count(){
        this.state.editing_count = true;
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

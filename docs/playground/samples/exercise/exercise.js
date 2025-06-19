// In this example, we show how components can be defined and created.
import { Component, useEnv, useSubEnv, useState, mount } from "@odoo/owl";

export class Parent extends Component {
   static template = 'training_oca.Parent';
   setup() {
      this.state = useState({
         name: 'Parent',
         value: 0,
      });
   }
}

mount(Parent, document.body, { templates: TEMPLATES, dev: true });

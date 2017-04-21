import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

@Component({
    moduleId: module.id.toString(),
    template: require('./register.component.html')
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor() { }


}
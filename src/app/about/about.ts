import {Component} from 'angular2/core';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
    selector: 'about',
    template: require('./about.html')
})
export class About {
    private value:  Array<number> = [];
    private final:  number = 0;
    constructor() {

    }

    ngOnInit() {
        console.log('hello `About` component');
    }

    calculate(){
        if (this.value[5] == 0){
            console.log("wrong");
        }else {
            this.final = (this.value[0] * (1 - this.value[1] / 100) - this.value[2] - this.value[4] + this.value[3]);
            this.final = this.final/this.value[5] + this.value[0]*(1+this.value[1]/100)* this.value[6]/2400;
            console.log(this.final);
            console.log(this.value);
        }
    }
}
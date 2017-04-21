import {Component} from 'angular2/core';
import {ViewChild} from "angular2/core";
import {AfterViewInit} from "angular2/core";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`game` component loaded asynchronously');

@Component({
    selector: 'game',
    template: require('./game.html')
})
export class Game implements AfterViewInit {
    constructor() {

    }

    ngOnInit() {
        console.log('hello `Game` component');
    }
  rectW:number = 100;
  rectH:number = 100;
  rectColor:string = "#FF0000";
  context:CanvasRenderingContext2D;

  @ViewChild("myCanvas") myCanvas;

  ngAfterViewInit() {

    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");

    this.tick();
  }

  tick() {

    requestAnimationFrame(()=> {
      this.tick()
    });

    var ctx = this.context;
    ctx.clearRect(300, 300, 800, 800);
    ctx.fillStyle = this.rectColor;
    ctx.fillRect(300, 300, 800, 800);
  }
}

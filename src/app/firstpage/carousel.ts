/**
 * Created by Tareq Boulakjar. from angulartypescript.com
 */
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Slide} from './slide.component';
import {Carousel} from './carousel.component';


/*Angular 2 Carousel - Gallery*/
@Component({
    selector: 'app',
    template:`
                    <div class="row slide">
                      <div class="col-md-12 slide-part">
                        <carousel [interval]="NextPhotoInterval" [noWrap]="noLoopSlides">
                          <slide *ngFor="#slidez of slides; #index=index"
                                 [active]="slidez.active">
                            <img class="img-responsive" [src]="slidez.image" style="margin:auto;">

                            <div class="carousel-caption">
                              <h3 style="background-color: transparent;color: white;">Slide {{index + 1}}</h3>
                              <p  style="background-color: transparent;color: white;">{{slidez.text}}</p>
                            </div>
                          </slide>
                        </carousel>
                      </div>
                    </div>

             `,
    directives: [Slide,Carousel, CORE_DIRECTIVES, FORM_DIRECTIVES],
})
export class Angular2Carousel  {
    //The time to show the next photo
    private NextPhotoInterval:number = 5000;
    //Looping or not
    private noLoopSlides:boolean = true;
    //Photos
    private slides:Array<any> = [];

    constructor() {
        this.addNewSlide();
    }

    private addNewSlide() {
        this.slides.push(
            {image:'http://www.angulartypescript.com/wp-content/uploads/2016/03/car1.jpg',text:'BMW 1'},
            {image:'http://www.angulartypescript.com/wp-content/uploads/2016/03/car2.jpg',text:'BMW 2'},
            {image:'http://www.angulartypescript.com/wp-content/uploads/2016/03/car3.jpg',text:'BMW 3'},
            {image:'http://www.angulartypescript.com/wp-content/uploads/2016/03/car4.jpg',text:'BMW 4'},
            {image:'http://www.angulartypescript.com/wp-content/uploads/2016/03/car5.jpg',text:'BMW 5'},
            {image:'http://www.angulartypescript.com/wp-content/uploads/2016/03/car6.jpg',text:'BMW 6'}
        );
    }

    private removeLastSlide() {
        this.slides.pop();
    }
}
// ```
// app.ts
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// app.ts may be freely distributed under the MIT license
// ```

// *src/app/app.ts*

// This file contains the main class as well as the necessary
// decorators for creating the primary `app` `component`

/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {Home} from './home/home';

import { RegisterComponent } from './register/index';
// Import NgFor directive
import {NgFor} from 'angular2/common';

// Import Todo component
import {Todo} from './todo/todo.component';
import {Profile} from './profile/profile.component';
// Import Recipes component
import {Recipes} from './recipes/recipes.component';

import {Chat} from './chat/chat.component';

import {SignUpComponent} from './auth/signup/signup.component';
import {SignInComponent} from './auth/signin/signin.component';
import {AuthService} from './auth/auth.service';
import {Game} from './game/game';
import {Angular2Carousel} from './firstpage/carousel';
import {bootstrap}  from 'angular2/platform/browser';
bootstrap(Angular2Carousel);
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ AuthService ],
  directives: [ Todo,
    NgFor],
  pipes: [],
  // Load our main `Sass` file into our `app` `component`
  styleUrls: [require('!style!css!sass!../sass/main.scss')],
  template: require('./layout.html')

})
@RouteConfig([
  { path: '/', name: 'Index', component: Angular2Carousel, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/todo', component: Todo, name: 'Todo' },
  { path: '/redux', component: Recipes, name: 'Recipes' },
  { path: '/profile', component: Profile, name: 'Profile' },
  { path: '/chat', component: Chat, name: 'Chat' },
  { path: '/register', component: RegisterComponent, name: 'RegisterComponent' },
  { path: '/signup', component: SignUpComponent, name: 'Signup' },
  { path: '/signin', component: SignInComponent, name: 'Signin' },
  { path: '/game', component: Game, name: 'Game' },
  // Async load a component using Webpack's require with
  // es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about/about')('About') },
])
export class App {
  angularLogo = 'assets/img/angular-logo.png';
  name = 'LoL Players';
  url = 'https://github.com/yulangchao';
  public check_button: any = false;
  public isAuthenticate: any;
  public authService: any;
  constructor(authService: AuthService) {

    this.authService = authService;
    this.isAuthenticate = authService.isAuthenticate();
  }

  press(){
    this.check_button = !this.check_button;

  }
}

/*
 * Please review the https://github.com/datatype_void/angular2-examples/ repo as it is updated for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @datatype_void on twitter
 * or our chat on Slack at https://VulgarDisplayOfPower.com/slack-join
 * or via chat on Gitter at https://gitter.im/datatype_void/angular2-webpack-starter
 */

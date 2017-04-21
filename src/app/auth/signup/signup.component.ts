// GLOBAL IMPORT
import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
// import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {HTTP_PROVIDERS} from 'angular2/http';
// SERVICES IMPORT
import{AuthService} from './../auth.service';
import {ProfileService} from './../../profile/profile.service';

@Component({
	selector: 'my-signup',
	providers: [...HTTP_PROVIDERS, AuthService, ProfileService],
	template: require('./signup.component.html')
})

export class SignUpComponent { 

	error: string; // the possible error message when signup
    result: any;
	signupData = {
		username: '',
		password: '',
		email: '',
		name: ''
	};

	password_confirm: string;

	constructor(private router: Router, private authService: AuthService, private profileService: ProfileService){
		if (localStorage.getItem('token')) {
			router.navigate(['Index']);
		}
	}

	// signin the new user if signup successfully
	signin(username: string, password: string){
		this.authService.signin(username, password)
			.subscribe(
				data => {
					location.reload();
				},
				error => {
					console.log(error);
					this.error = error._body.split("<pre>")[1].split("</pre>")[0];
				}
			);
	}

	// create the new user
	signup(){

		let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

		if(this.signupData.name.length >10 || this.signupData.name.length <=0) {
			this.error = "Name is needed or it is too long!";

		}else if(!re.test(this.signupData.email)) {
			this.error = "Email is not correct!";

		}else if (!this.signupData.username) {
			this.error = "Username is needed!";

		}else if (this.password_confirm !== this.signupData.password) {
            this.error = "Password are not matched!";

		}else {
			this.authService.signup(this.signupData)
                .subscribe(
					data => {
						this.signin(this.signupData.username, this.signupData.password);
					},
					error => {
						console.log(error.text());
						this.error = error._body.split("<pre>")[1].split("</pre>")[0];
					}
				);

			this.profileService.createProfile({name: this.signupData.name, email: this.signupData.email})
                .subscribe(
					data => {

					},
					error => {
						console.log(error.text());
						this.error = error._body.split("<pre>")[1].split("</pre>")[0];
					}
				);
		}
	}

}

// GLOBAL IMPORT
import {Injectable, Inject} from 'angular2/core';
import {Http, Headers, Response } from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";
import 'rxjs/Rx';
import {Router} from 'angular2/router';
Injectable()
export class AuthService{

	// for change the navbar state between online and offline
	private authenticate = new Subject<boolean>();
	authenticateState$ = this.authenticate.asObservable();

	constructor(@Inject(Http) private http: Http){}

	signup(data): Observable<any> {
		let headers = new Headers();

		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/auth/signup', JSON.stringify(data),
			{headers: headers})
		.map(res => res);
	}

	signin(username: string, password: string): Observable<any> {
		let headers = new Headers();

		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/auth/login', JSON.stringify({ username: username, password: password }),{headers: headers})
            .map((response: Response) => {
				// login successful if there's a jwt token in the response
				let user = response.json();
				console.log(user);
				if (user) {

					// store user details and jwt token in local storage to keep user logged in between page refreshes
					this.saveToken(JSON.stringify(user));
				}
			});
	}

	// delete the token in localStorage and change the navbar state
	logout(): void {
      	localStorage.removeItem('token');
      	this.authenticate.next(false);
		location.reload();
    }

    // save the token in localStorage and change the navbar state
	saveToken(token: string): void {
		console.log("saved");
		localStorage.setItem('token', token);
		this.authenticate.next(true);
	}

	// return if the user is authenticate
	isAuthenticate(): boolean {
		let isAuth: boolean;
		if(localStorage.getItem('token')){
			isAuth = true;
		}else{
			isAuth = false;
		}
		return isAuth;
	}
		
}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	authState = new BehaviorSubject(false)

	constructor(private router:Router, private auth:AngularFireAuth) { }

	login(user:any){
		
		console.log(user);
		this.auth.signInWithEmailAndPassword(user.email,user.password)
		.then(response => {
			this.router.navigate(['accueil'])
			this.authState.next(true)
		})
	}

	logout(){
		this.router.navigate(['login'])
		this.authState.next(false)
	}

	isAuthenticated() {
		return this.authState.value
	}

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import jwtDecode from 'jwt-decode';

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
			response.user?.getIdToken().then(token => {
				console.log(token)
				if (token) localStorage.setItem('token',token)
				const decode = jwtDecode(token)
				console.log(decode);
				
			})
		})
	}

	logout(){
		localStorage.removeItem('token')
		this.router.navigate(['login'])
		this.authState.next(false)
	}

	isAuthenticated() {
		return this.authState.value
	}

}

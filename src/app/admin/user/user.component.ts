import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  email:string=""
	password:string=""
  users:any = []
  
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  
	getUsers(){
		this.http.get('https://us-central1-step-back-3fef2.cloudfunctions.net/getUser').subscribe((res:any) => {
			this.users = res
			console.log(this.users);
			
		})
	}

	

	addUser(){
		const user = {
			email:	this.email,
			passwor:this.password,
		}
		console.log(user);
		if (this.email !== '' && this.password !== '')
			this.http.post('https://us-central1-step-back-3fef2.cloudfunctions.net/newUser',{user}).subscribe(res => console.log(res))
	}

}

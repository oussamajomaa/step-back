import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user={
    email:"",
    password:""
  }

  constructor(private authService:AuthService, private router:Router) { }

	ngOnInit(): void {
		
	}

 	login(){
		this.authService.login(this.user)
  	}
}

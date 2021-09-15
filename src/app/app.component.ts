import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MenusService } from './services/menus.service';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	token:any=''
	user:any={}
	role:any=""
	constructor(public menuServ:MenusService,public auth: AuthService, private http:HttpClient){
		console.log("auth service ",this.auth);
		
		this.auth.idTokenClaims$.subscribe((res:any) => {
			console.log("idToken ",res);
			if (res && res['https://example.com/roles'])
				this.role = res['https://example.com/roles'][0]
			if (this.role != '')
				localStorage.setItem('role',this.role)
			
			this.token = res?.__raw
			localStorage.setItem('token',this.token)
			// console.log(this.token);
			const decode = jwt_decode(res?.__raw) 
			console.log("decode ",decode);
			
			
			// this.http.get('https://dev-m438qh2i.us.auth0.com/api/v2/users',
			// {params:{q:'email:"osmjom@gmail.com"',search_engine: 'v3'}})
			// .subscribe(users => console.log(users))
		})
		
		this.auth.user$.subscribe(res => {
			this.user = res
			console.log(this.user);
			
			if (this.user){
				localStorage.setItem('name',this.user.name)
				localStorage.setItem('id',this.user.sub)
			}
		})
		
		
	}
  

	ngOnInit() {  
		
	}  

	

}

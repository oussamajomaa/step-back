import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
	@ViewChild('elementMenu', {static: true}) elementMenu:any;

	typeMenu:string=""
	element:string=""
	element_order:any=null
	socialElement:string=""
	menu:any = []
	isAdd:boolean = false
	constructor(private http:HttpClient) { }

	ngOnInit(): void {
		this.getMenu()
		// this.getUsers()
	}

	
	saveMenu(){
		let el = this.element.split(' ')[0].toLowerCase()
		// remove accent
		el = el.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		
		let item = {
			id: uuid(),
			menu_name: el,
			menu_type: "principal",
			menu_default:false,
			menu_order:this.element_order,
			menu_component:el.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })+'Component'
		}
		console.log(item);
		console.log(this.menu);
		
		
		if (!this.menu.find((e:any) => e.element === el)){
			this.http.post(`${environment.url_menu}/add-menu`,item)
			.subscribe((res:any) => {
				console.log(res)
				this.getMenu()
			})
		}
		this.element = ''
		this.elementMenu.nativeElement.focus()
	}

	getMenu(){
		return this.http.get(`${environment.url_menu}/get-menu`)
		.subscribe((res:any) => {
			this.menu = res
			this.menu = this.menu.sort((a:any,b:any) => {
				if (a.menu_order < b.menu_order) return -1
				if (a.menu_order < b.menu_order) return 1
				return 0
			})
		})
		
	}

	deleteMenu(id:string){
		this.http.delete(`${environment.url_menu}/delete-menu`, {params:{id:id}})
		.subscribe(res => this.getMenu())
	}

	// mettre un link ou menu par defautl
	radioClick(e:any, menu_id:string){
		const ids:any = []
		this.menu.map((item:any) => ids.push(item.id))

		ids.map((id:string) => {
			let item
			if (id === menu_id){
				item = {
					id:id,
					menu_default:true
				}
			}
			else{
				item = {
					id:id,
					menu_default:false
				}
			}
			this.http.patch(`${environment.url_menu}/update-menu`,item)
			.subscribe(res => this.getMenu())	
		})

		// const arrasync = ids.map((id:string) => {
		// 	let item
		// 	if (id === menu_id){
		// 		item = {
		// 			id:id,
		// 			menu_default:true
		// 		}
		// 	}
		// 	else{
		// 		item = {
		// 			id:id,
		// 			menu_default:false
		// 		}
		// 	}
		// 	return this.http.patch(`${environment.url_menu}/update-menu`,item)	
		// })
		// console.log("ids", ids);
		// forkJoin(arrasync).subscribe(() => {
		// 	this.getMenu()
		// })
	}




	// ########################################################################"
	// cloud function on google firebase

	// users:any = []
	// getUsers(){
	// 	this.http.get('https://us-central1-step-back-3fef2.cloudfunctions.net/getUser').subscribe((res:any) => {
	// 		this.users = res
	// 		console.log(this.users);
			
	// 	})
	// }

	// email:string=""
	// password:string=""

	// addUser(){
	// 	const user = {
	// 		email:	this.email,
	// 		passwor:this.password,
	// 	}
	// 	console.log(user);
		
	// 	this.http.post('https://us-central1-step-back-3fef2.cloudfunctions.net/newUser',{user}).subscribe(res => console.log(res))
	// }
}

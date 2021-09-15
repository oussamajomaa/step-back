import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ModelService } from 'src/app/services/model.service';
import { v4 as uuid } from 'uuid';
import { DataService } from 'src/app/services/data.service';


@Component({
	selector: 'app-tag',
	templateUrl: './tag.component.html',
	styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

	panelOpenState = false;
	form = new FormGroup({});
	model:any = {}
	fields: any = []
	isAddClicked : boolean = false
	isChecked : boolean = true

	tags:any = []
	tag:string=''
	id:string = ""

	msg = {
		text:"",
		class:""
	}

	top = ""

	displayAlert: boolean = false;
	deleteAlert: boolean = false;
  
	constructor(public modelService:ModelService,private http:HttpClient, private dataService:DataService) { }

	ngOnInit(): void {
		const tag = this.modelService.models.find(model => model.title === 'tag')
		this.fields = tag?.fields
		this.getTag()
	}

	getTag(){
		this.dataService.getTag().subscribe(res => this.tags = res)
	}

	saveTag(event:MouseEvent){
		this.deleteAlert = false
		const item = {
			id: uuid(),
			name:this.tag
		}
		const tag = this.tags.find((tag:any) => tag.name === this.tag)
		if (!tag){
			this.http.post(`${environment.url_component}/tag/add-tag`,item)
			.subscribe((res: any) => {
				this.getTag()
				this.msg.text = res
				this.msg.class = "step-green"
				this.showAlert()
				this.top = (event.clientY+20).toString()+"px"
			})
			this.tag=''
		}
		else {
			this.msg.text = "Cette étiquette existe déjà !!!"
			this.msg.class = "step-yellow"
			this.showAlert()
			this.top = (event.clientY+20).toString()+"px"
			console.log(this.top);
			
		}
		
	}

	showAlert(){
		this.displayAlert = true;
	}

	closeAlert(){
		this.displayAlert = false;
	}

	deleteTag(id:string,tag:string,event:MouseEvent){
		this.deleteAlert = true
		this.id = id
		this.msg.text = `Etes-vous sûrs de supprimer l'étiquette "${tag}"?`
		this.msg.class = "step-yellow"
		this.showAlert()
		this.top = (event.clientY+20).toString()+"px"

	}

	confirmDelete(){
		this.http.delete(`${environment.url_component}/tag/delete-tag`,{params:{id:this.id}})
		.subscribe((res:any) => {
			this.getTag()
			this.deleteAlert = false
			this.msg.text = "Une étiquette a été supprimé !!!"
			this.msg.class = "step-orange"
			this.showAlert()
		})
	}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';

declare interface User{
  Id: number;
  UserName:string;
  Password:string;
  Mobile:string;
  Email:string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   userList = [];
   userForm : FormGroup;
   IsEditing : boolean;
  constructor(private auth: AuthService, private fb: FormBuilder, private snak: MatSnackBar ) { }

  ngOnInit(): void {
    this.GetAllUsers();
      this.userForm = this.fb.group({
        userName : ['' ,Validators.required],
            password : [''],
            mobile   : [''],
            email    : ['']
      })
      
  }

  onSave(){
      let data = this.userForm.value;
      if(this.userForm.valid){
        this.auth.SaveUser(data).subscribe(r=> {
          let obj = r as any;
          if(obj.msg==4){
            this.snak.open("This User is allready Exist.", "OK",{ duration:3000, politeness:"assertive"});
          }
          else if(obj.msg==1){
            this.ClearParams();
            this.snak.open("Saved Successfully.", "OK",{ duration:3000, politeness:"assertive"});
            this.GetAllUsers();
          }
          else if(obj.msg==3){
            this.ClearParams();
            this.snak.open("Updated Suceesfully. ","OK", {duration:3000, politeness:"assertive"});
            this.GetAllUsers();
          }
          else{
            this.snak.open("This User is allready Exist.","OK", {duration:3000,politeness:"assertive"});
          }
          
          
        })
      } 
  }

  onEdit(user : User){
      this.IsEditing = true;
      let data = this.userForm.patchValue(user);
      console.log(data);
  }

  onDelete(user : User){
      this.auth.DeleteUser(user).subscribe(r=> {
        let obj = r as any;
        if(obj.msg==1){
          this.snak.open("Deleted Successfully!","OK",{duration:3000});
          this.GetAllUsers();
        }
      })
  }

  GetAllUsers(){
    this.auth.GetAllUsers().subscribe(r=>{
      this.userList = r as any;   
    })
  }

  ClearParams(){
    this.userForm.value == '';
  }

}

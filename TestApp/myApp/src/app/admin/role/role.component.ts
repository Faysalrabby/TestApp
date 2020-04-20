import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';
declare interface Role{
  Id: number;
  RoleName:string;
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roleList = [];
  roleForm : FormGroup;
  IsEditing : boolean;
 constructor(private auth: AuthService, private fb: FormBuilder, private snak: MatSnackBar ) { }

  ngOnInit(): void {
    this.GetRoles();
    this.roleForm = this.fb.group({
      roleName : ['' ,Validators.required],
    });
  }

  onSave(){
    let data = this.roleForm.value;
    if(this.roleForm.valid){
      this.auth.SaveRole(data).subscribe(r=> {
        let obj = r as any;
        if(obj.msg==4){
          this.snak.open("This User is allready Exist.", "OK",{ duration:3000, politeness:"assertive"});
        }
        else if(obj.msg==1){
          this.ClearParams();
          this.snak.open("Saved Successfully.", "OK",{ duration:3000, politeness:"assertive"});
          this.GetRoles();
        }
        else if(obj.msg==3){
          this.ClearParams();
          this.snak.open("Updated Suceesfully. ","OK", {duration:3000, politeness:"assertive"});
          this.GetRoles();
        }
        else{
          this.snak.open("This User is allready Exist.","OK", {duration:3000,politeness:"assertive"});
        }       
      })
    } 
}

  onEdit(role : Role){
    this.IsEditing = true;
    let data = this.roleForm.patchValue(role);
    console.log(data);
}

onDelete(role : Role){
    this.auth.DeleteRole(role).subscribe(r=> {
      let obj = r as any;
      if(obj.msg==1){
        this.snak.open("Deleted Successfully!","OK",{duration:3000});
        this.GetRoles();
      }
    })
}

GetRoles(){
  this.auth.GetRoles().subscribe(r=>{
    this.roleList = r as any;
    console.log(this.roleList); 
  })
}

ClearParams(){
  this.roleForm.value == '';
}


}

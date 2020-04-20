import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginInfo = { userName : null , password : null};
  constructor
  (
    private auth: AuthService,
    private fb: FormBuilder, 
    private snak: MatSnackBar,
    private route:Router
  ) { }

  ngOnInit(): void {
  }


  onLogin(){
    if(this.LoginInfo.userName == null || this.LoginInfo.password==null){
      this.snak.open("please provide both username and password.","OK", {duration:3000 , politeness:"assertive"});
      return;
    }

      this.auth.Login(this.LoginInfo, r=> {
        switch (r) {
          case 1:
            this.snak.open("Login Success!", "", { duration: 2000 });
            this.route.navigateByUrl("/admin");
            break;
          case 2:
            this.snak.open("Wrong Password!", "OK", { duration: 2000 });
            break;
          default:
            this.snak.open("Login failed for user!", "OK", { duration: 2000 });
            break;
        }
      })
    
  }

}

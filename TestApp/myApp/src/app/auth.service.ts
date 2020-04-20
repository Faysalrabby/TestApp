import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User , Role } from '../app/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

  Login(LoginInfo: { userName:any ; password:any;}, callback:(r:any)=> void): any {
    this.http.post("/Auth/Login", LoginInfo).subscribe(r=> {
      let obj = r as any;
      if(obj.msg==1){      
      }
      callback(obj.msg);
    })
}

  GetAllUsers(){
    return this.http.get("/Auth/GetUser");
  }

  SaveUser(userModel : User){
      console.log(userModel);
      return this.http.post("/Auth/AddUser", userModel);
  }

  DeleteUser(item: User){
     return this.http.post("/Auth/DeleteUser", item);
  }

  GetRoles(){
    return this.http.get("/Auth/GetRoles");
  }
  
  SaveRole(role : Role){
    console.log(role);
    return this.http.post("/Auth/AddRole", role);
}
  DeleteRole(item: Role){
    return this.http.post("/Auth/DeleteRole",item);
  }

}

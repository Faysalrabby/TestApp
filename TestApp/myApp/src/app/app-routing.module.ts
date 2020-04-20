import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './admin/user/user.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RoleComponent} from './admin/role/role.component';



const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'admin' , component: AdminComponent,
  children:[
    {path: '', component:DashboardComponent},
    {path: 'dashboard', component:DashboardComponent},
    {path: 'user', component:UserComponent},
    {path: 'role', component: RoleComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

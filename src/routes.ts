import { Routes } from '@angular/router';
import {LoginComponent} from './app/login/login.component';
import { UploadDetailsComponent } from './app/upload-details/upload-details.component';
import { AuthenticationGuardService } from './app/authentication-guard.service';


export const appRoutes: Routes = [
     {path: 'upload', component: UploadDetailsComponent, canActivate: [AuthenticationGuardService]},
     {path: '', redirectTo: '/upload', pathMatch : 'full'},
     {path: 'login', component: LoginComponent},
    ];

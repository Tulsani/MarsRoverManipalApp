import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import {Router} from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailsComponent } from '../details/details.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthenticationService , private router: Router) { }

  signIn() {
    this.authService.login({email : this.email , password: this.password})
    .then(resolve => this.router.navigate(['upload']))
    .catch(error => this.errorMsg = error.message);
  }


}

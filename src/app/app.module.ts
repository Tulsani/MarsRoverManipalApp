import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UploadDetailsComponent } from './upload-details/upload-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationGuardService } from './authentication-guard.service';
import { AuthenticationService } from './authentication.service';
import { UploadService } from './upload.service';
import { RouterModule } from '@angular/router';
import {FormsModule } from '@angular/forms';
import { appRoutes } from '../routes';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UploadDetailsComponent,
    NavbarComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireAuthModule,
    CommonModule,
    AngularFirestoreModule
  ],
  providers: [AuthenticationGuardService,
  AuthenticationService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }

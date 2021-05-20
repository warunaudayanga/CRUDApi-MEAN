import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VersionListComponent } from './versions/version-list/version-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MaterialModule} from "./material/material.module";
import {FlexModule} from "@angular/flex-layout";
import { VersionsComponent } from './versions/versions.component';
import { VersionDialogComponent } from './versions/version-dialog/version-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SpinnerComponent } from './loading/spinner/spinner.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthInterceptor} from "./auth/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    VersionListComponent,
    NavBarComponent,
    VersionsComponent,
    VersionDialogComponent,
    SpinnerComponent,
    LoadingComponent,
    LoginComponent,
    SignupComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FontAwesomeModule,
        FlexModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [
      {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

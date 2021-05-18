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
import { VersionCreateDialogComponent } from './versions/version-create-dialog/version-create-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    VersionListComponent,
    NavBarComponent,
    VersionsComponent,
    VersionCreateDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FontAwesomeModule,
        FlexModule,
        ReactiveFormsModule
    ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  bootstrap: [AppComponent]
})
export class AppModule { }

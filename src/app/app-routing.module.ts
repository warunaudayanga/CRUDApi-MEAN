import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VersionListComponent} from "./versions/version-list/version-list.component";
import {VersionsComponent} from "./versions/versions.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
    {path: '', component: VersionsComponent},
    {path: 'list', component: VersionListComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }

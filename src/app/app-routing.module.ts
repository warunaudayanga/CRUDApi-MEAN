import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VersionListComponent} from "./versions/version-list/version-list.component";
import {VersionsComponent} from "./versions/versions.component";

const routes: Routes = [
  {path: '', component: VersionsComponent},
  {path: 'list', component: VersionListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

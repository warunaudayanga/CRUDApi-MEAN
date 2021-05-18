import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  template: '<app-nav-bar></app-nav-bar><router-outlet></router-outlet>'
})
export class AppComponent {
    constructor(private titleService: Title) {
        titleService.setTitle('CRUD Sample');
    }
}

import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  template: '<app-loading></app-loading><app-nav-bar></app-nav-bar><router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

    constructor(
        private titleService: Title,
        private authService: AuthService
    ) {
        titleService.setTitle('CRUD Sample');
    }

    ngOnInit(): void {
        this.authService.autoAuthUser();
    }
}

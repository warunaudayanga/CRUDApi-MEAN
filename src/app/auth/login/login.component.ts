import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form!: FormGroup;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', Validators.email),
            password: new FormControl('', Validators.required)
        });
    }

    onSubmit(): void {
        if(this.form.valid) {
            this.authService.login(this.form.value.email, this.form.value.password);
        }
    }
}

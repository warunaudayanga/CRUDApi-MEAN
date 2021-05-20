import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    form!: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            email: new FormControl(''),
            password: new FormControl('', Validators.required),
            confirm: new FormControl('', Validators.required),
        }, {validators: this.confirmPassword})
    }

    confirmPassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
        if(group.value.password != group.value.confirm) {
            setTimeout(() => {
                if(this.form.value.confirm.length > 0) {
                    this.form.controls.confirm.markAsDirty();
                    this.form.controls.confirm.markAsTouched();
                }
                this.form.controls.confirm.setErrors([{passwordMismatch: true}]);
            })
            return {passwordMismatch: true}
        }
        setTimeout(() => {
            this.form.controls.confirm.setErrors(null);
        })
        return null;
    }

    onSubmit(): void {
        if(this.form.valid) {
            this.authService.createUser(this.form.value.email, this.form.value.password);
        }
    }
}

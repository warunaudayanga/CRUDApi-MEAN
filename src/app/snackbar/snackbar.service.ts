import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    constructor(private snackBar: MatSnackBar) { }

    public open(msg: string, action: string, config: object): void {
        this.snackBar.open(msg, action, config);
    }

    public info(msg: string): void {
        this.snackBar.open(msg, '', {panelClass: ['bg-info']});
    }

    public success(msg: string): void {
        this.snackBar.open(msg, '', {panelClass: 'bg-success'});
    }

    public error(msg: string): void {
        this.snackBar.open(msg, '', {panelClass: 'bg-error'});
    }

}

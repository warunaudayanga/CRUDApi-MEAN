import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VersionDialogData, VersionDialogOptions} from "./dialog-data.modal";

@Component({
    selector: 'app-version-create-dialog',
    templateUrl: './version-dialog.component.html',
    styles: ['mat-slide-toggle {margin: 8px 0; display: block;}']
})
export class VersionDialogComponent implements OnInit {

    form!: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<VersionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: VersionDialogOptions,
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            status: new FormControl(false)
        });
        if(this.data) this.form.setValue({name: this.data.name, status: this.data.status})
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onOKClick(): void {
        const data: VersionDialogData = {name: this.form.value.name, status: this.form.value.status}
        if(this.form.valid) this.dialogRef.close(data);
    }
}

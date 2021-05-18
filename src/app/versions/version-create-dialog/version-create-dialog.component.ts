import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogData} from "./dialog-data.modal";

@Component({
    selector: 'app-version-create-dialog',
    templateUrl: './version-create-dialog.component.html',
    styles: ['mat-slide-toggle {margin: 8px 0; display: block;}']
})
export class VersionCreateDialogComponent {

    versionForm: FormGroup = new FormGroup({
        name: new FormControl(this.data.name, Validators.required),
        status: new FormControl(this.data.status)
    });

    constructor(
        public dialogRef: MatDialogRef<VersionCreateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onOKClick(): void {
        const data: DialogData = {name: this.versionForm.value.name, status: this.versionForm.value.status}
        if(this.versionForm.valid) this.dialogRef.close(data);
    }
}

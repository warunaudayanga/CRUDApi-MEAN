import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface DialogData {
    name: string;
}
@Component({
    selector: 'app-version-create-dialog',
    templateUrl: './version-create-dialog.component.html',
    styleUrls: ['./version-create-dialog.component.scss']
})
export class VersionCreateDialogComponent {

    versionForm: FormGroup = new FormGroup({
        name: new FormControl(this.data.name, Validators.required)
    });

    constructor(
        public dialogRef: MatDialogRef<VersionCreateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onOKClick(): void {
        if(this.versionForm.valid) this.dialogRef.close(this.versionForm.value.name);
    }
}

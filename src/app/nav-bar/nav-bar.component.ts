import { Component} from '@angular/core';
import {faPlus, faBars} from "@fortawesome/free-solid-svg-icons";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {VersionCreateDialogComponent} from "../versions/version-create-dialog/version-create-dialog.component";
import {VersionService} from "../versions/version.service";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {DialogData} from "../versions/version-create-dialog/dialog-data.modal";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styles: ['.home {cursor: pointer}']
})
export class NavBarComponent {

    faPlus: IconDefinition = faPlus;
    faBars: IconDefinition = faBars;

    constructor(public dialog: MatDialog, private vService: VersionService) { }

    createVersion(): void {
        const data: DialogData = {name: '', status: false}
        const dialogRef: MatDialogRef<VersionCreateDialogComponent> = this.dialog.open(VersionCreateDialogComponent, {
            data: data
        });

        dialogRef.afterClosed().subscribe((data: DialogData) => {
            if(data !== undefined) {
                this.vService.addVersion(data.name, data.status);
            }
        });
    }
}

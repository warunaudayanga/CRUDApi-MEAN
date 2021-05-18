import { Component} from '@angular/core';
import {faPlus, faBars} from "@fortawesome/free-solid-svg-icons";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {VersionCreateDialogComponent} from "../versions/version-create-dialog/version-create-dialog.component";
import {VersionService} from "../versions/version.service";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

    faPlus: IconDefinition = faPlus;
    faBars: IconDefinition = faBars;

    constructor(
        public dialog: MatDialog,
        private vService: VersionService
    ) { }

    createVersion(): void {
        const dialogRef: MatDialogRef<VersionCreateDialogComponent> = this.dialog.open(VersionCreateDialogComponent, {
            data: {name: ''}
        });

        dialogRef.afterClosed().subscribe(versionName => {
            if(versionName !== undefined) {
                this.vService.addVersion(versionName);
            }
        });
    }
}

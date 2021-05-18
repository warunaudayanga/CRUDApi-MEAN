import {Component, OnDestroy, OnInit} from '@angular/core';
import {Version} from "../version.modal";
import {VersionService} from "../version.service";
import {Subscription} from "rxjs";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {VersionCreateDialogComponent} from "../version-create-dialog/version-create-dialog.component";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {DialogData} from "../version-create-dialog/dialog-data.modal";

@Component({
    selector: 'app-version-list',
    templateUrl: './version-list.component.html',
    styles: [
        '.mat-list-base:not(:first-child) {padding: 0}',
        'mat-list-item button {margin-left: 10px}'
    ]
})
export class VersionListComponent implements OnInit, OnDestroy {

    faPen: IconDefinition = faPen;
    faTrash: IconDefinition = faTrash;
    versions: Version[] = [];

    private versionSubscription: Subscription;

    constructor(public dialog: MatDialog, private vService: VersionService) {
        this.versionSubscription = vService.getVersionUpdatedListener()
            .subscribe((versions: Version[]) => {
                this.versions = versions;
            });
    }

    ngOnInit(): void {
        this.vService.getVersions();
    }

    editVersion(version: Version): void {
        const data: DialogData = {name: version.name, status: version.status};
        const dialogRef: MatDialogRef<VersionCreateDialogComponent> = this.dialog.open(VersionCreateDialogComponent, {
            data: data
        });

        dialogRef.afterClosed().subscribe((data: DialogData) => {
            if(data !== undefined) {
                this.vService.editVersion(version.id, data.name, data.status);
            }
        });
    }

    deleteVersion(id: string): void {
        this.vService.deleteVersion(id);
    }

    ngOnDestroy(): void {
        this.versionSubscription.unsubscribe();
    }
}

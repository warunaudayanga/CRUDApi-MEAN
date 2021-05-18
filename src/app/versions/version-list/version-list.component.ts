import {Component, OnDestroy, OnInit} from '@angular/core';
import {Version} from "../version.modal";
import {VersionService} from "../version.service";
import {Subscription} from "rxjs";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {VersionCreateDialogComponent} from "../version-create-dialog/version-create-dialog.component";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";

@Component({
    selector: 'app-version-list',
    templateUrl: './version-list.component.html',
    styleUrls: ['./version-list.component.scss']
})
export class VersionListComponent implements OnInit, OnDestroy {

    faPen: IconDefinition = faPen
    faTrash: IconDefinition = faTrash
    versions: Version[] = [];

    private versionSubscription: Subscription;

    constructor(
        public dialog: MatDialog,
        private vService: VersionService
    ) {
        this.versionSubscription = vService.getVersionUpdatedListener()
            .subscribe((versions: Version[]) => {
                this.versions = versions;
            });
    }

    ngOnInit(): void {
        this.vService.getVersions();
    }

    editVersion(version: Version): void {
        const dialogRef: MatDialogRef<VersionCreateDialogComponent> = this.dialog.open(VersionCreateDialogComponent, {
            data: {name: version.name}
        });

        dialogRef.afterClosed().subscribe(versionName => {
            if(versionName !== undefined) {
                this.vService.editVersion(version.id, versionName);
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

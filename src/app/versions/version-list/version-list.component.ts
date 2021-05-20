import {Component, OnDestroy, OnInit} from '@angular/core';
import {Version} from "../version.modal";
import {VersionService} from "../version.service";
import {Subscription} from "rxjs";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {VersionDialogComponent} from "../version-dialog/version-dialog.component";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {VersionDialogData, VersionDialogOptions} from "../version-dialog/dialog-data.modal";
import {AuthService} from "../../auth/auth.service";

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

    private authStatusSubscription!: Subscription;
    private versionSubscription!: Subscription;
    isAuthenticated: boolean = false;

    constructor(
        public dialog: MatDialog,
        private vService: VersionService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.isAuthenticated = this.authService.getIsAuthenticated();
        this.authStatusSubscription = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.isAuthenticated = isAuthenticated;
            });
        this.versionSubscription = this.vService.getVersionUpdatedListener()
            .subscribe((versions: Version[]) => {
                this.versions = versions;
            });
        this.vService.getVersions();
    }

    editVersion(version: Version): void {
        const data: VersionDialogOptions = {type: 'Update', name: version.name, status: version.status};
        const dialogRef: MatDialogRef<VersionDialogComponent> = this.dialog.open(VersionDialogComponent, {
            data: data
        });
        dialogRef.afterClosed().subscribe((data: VersionDialogData) => {
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
        this.authStatusSubscription.unsubscribe();
    }
}

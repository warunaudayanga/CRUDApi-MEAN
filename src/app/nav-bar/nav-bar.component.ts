import {Component, OnDestroy, OnInit} from '@angular/core';
import {faPlus, faBars, faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {VersionDialogComponent} from "../versions/version-dialog/version-dialog.component";
import {VersionService} from "../versions/version.service";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {VersionDialogData, VersionDialogOptions} from "../versions/version-dialog/dialog-data.modal";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styles: ['.home {cursor: pointer}']
})
export class NavBarComponent implements OnInit, OnDestroy {

    faPlus: IconDefinition = faPlus;
    faBars: IconDefinition = faBars;
    faSignInAlt: IconDefinition = faSignInAlt;
    faSignOutAlt: IconDefinition = faSignOutAlt;

    private authStatusSubscription!: Subscription;
    isAuthenticated: boolean = false;

    constructor(
        public dialog: MatDialog,
        private vService: VersionService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authStatusSubscription = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.isAuthenticated = isAuthenticated;
            });
    }

    createVersion(): void {
        const data: VersionDialogOptions = {type: 'Add', name: '', status: false}
        const dialogRef: MatDialogRef<VersionDialogComponent> = this.dialog.open(VersionDialogComponent, {
            data: data
        });

        dialogRef.afterClosed().subscribe((data: VersionDialogData) => {
            if(data !== undefined) {
                this.vService.addVersion(data.name, data.status);
            }
        });
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.authStatusSubscription.unsubscribe();
    }
}

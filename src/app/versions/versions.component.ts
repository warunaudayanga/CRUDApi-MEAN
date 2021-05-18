import { Component, OnInit } from '@angular/core';
import {Version} from "./version.modal";
import {VersionService} from "./version.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-versions',
    template: '<mat-card *ngIf="lastVersion !== null">Last Version is: {{lastVersion.name}}</mat-card>',
    styles: ['mat-card {margin: 20px !important}']
})
export class VersionsComponent implements OnInit {

    lastVersion: Version | null = null;
    private versionSubscription: Subscription;

    constructor(private vService: VersionService) {
        this.versionSubscription = vService.getVersionUpdatedListener()
            .subscribe((versions: Version[]) => {
                this.lastVersion = versions[versions.length - 1];
            });
    }

    ngOnInit(): void {
        this.vService.getVersions();
    }

    ngOnDestroy(): void {
        this.versionSubscription.unsubscribe();
    }

}

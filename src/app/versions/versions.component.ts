import { Component, OnInit } from '@angular/core';
import {Version} from "./version.modal";
import {VersionService} from "./version.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-versions',
    template: '<mat-card>{{lastVersion? \'Last Version is: \' + lastVersion.name: \'No versions added yet!\'}}</mat-card>',
    styles: ['mat-card {margin: 20px !important}']
})
export class VersionsComponent implements OnInit {

    lastVersion!: Version;
    private versionSubscription!: Subscription;

    constructor(private vService: VersionService) { }

    ngOnInit(): void {
        this.versionSubscription = this.vService.getVersionUpdatedListener()
            .subscribe((versions: Version[]) => {
                this.lastVersion = versions[versions.length - 1];
            });
        this.vService.getVersions();
    }

    ngOnDestroy(): void {
        this.versionSubscription.unsubscribe();
    }

}

import { Component, OnInit } from '@angular/core';
import {LoadingService} from "./loading.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-loading',
    template: '<div *ngIf="isLoading" id="loading"><app-spinner></app-spinner></div>',
})
export class LoadingComponent implements OnInit {

    private loadingSubscription!: Subscription;
    isLoading: boolean = false;

    constructor(private loading: LoadingService) { }

    ngOnInit(): void {
        this.loadingSubscription = this.loading.getLoadingListener()
            .subscribe((isLoading: boolean) => {
                this.isLoading = isLoading;
            });
    }

}

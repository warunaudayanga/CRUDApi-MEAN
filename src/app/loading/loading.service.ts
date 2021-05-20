import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    loadingListener: Subject<boolean> = new Subject<boolean>();

    constructor() { }

    show(): void {
        this.loadingListener.next(true);
    }

    hide(): void {
        this.loadingListener.next(false);
    }

    getLoadingListener(): Observable<boolean> {
        return this.loadingListener.asObservable();
    }
}

import { Injectable } from '@angular/core';
import {LoadingService} from "./loading/loading.service";
import {SnackbarService} from "./snackbar/snackbar.service";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private loading: LoadingService,
        private snackBar: SnackbarService
    ) { }

    showLoading(): void {
        this.loading.show();
    }

    hideLoading(): void {
        this.loading.hide();
    }

    public info(msg: string) {
        this.snackBar.info(msg);
    }

    public success(msg: string) {
        this.snackBar.success(msg);
    }

    public error(msg: string) {
        this.snackBar.error(msg);
    }


}

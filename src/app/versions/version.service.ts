import { Injectable } from '@angular/core';
import {Version} from "./version.modal";
import {Observable, Subject} from "rxjs";
import {SnackbarService} from "../snackbar/snackbar.service";

@Injectable({
    providedIn: 'root'
})
export class VersionService {

    private versions: Version[] = [];
    private versionUpdated = new Subject<Version[]>();

    constructor(private snackBar: SnackbarService) {
        // fetch from backend later
        this.versions = [
            {id: '1', name: 'V1'},
            {id: '2', name: 'V2'},
            {id: '3', name: 'V3'}
        ]
    }

    getVersions(): void {
        this.versionUpdated.next([...this.versions]);
    }

    addVersion(name: string): void {
        const version: Version = {id: '', name: name};
        // send to backend later
        this.versions.push(version);
        this.versionUpdated.next([...this.versions]);
        this.snackBar.success('Version added successfully!');
    }

    editVersion(id: string, name: string): void {
        const version: Version = {id: id, name: name};
        // send to backend later
        // make versions immutable before send
        const updatedVersions = [...this.versions];
        const vIndex = updatedVersions.findIndex(v => v.id === version.id);
        updatedVersions[vIndex] = version;
        this.versions = updatedVersions;
        this.versionUpdated.next([...this.versions]);
        this.snackBar.success('Version updated successfully!');
    }

    deleteVersion(id: string): void {
        // send to backend later
        this.versions = this.versions.filter(v => v.id !== id);
        this.versionUpdated.next([...this.versions]);
        this.snackBar.success('Version deleted successfully!');
    }

    getVersionUpdatedListener(): Observable<Version[]> {
        return this.versionUpdated.asObservable();
    }

}

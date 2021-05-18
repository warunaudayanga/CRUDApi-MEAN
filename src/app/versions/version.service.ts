import { Injectable } from '@angular/core';
import {Version} from "./version.modal";
import {Observable, Subject} from "rxjs";
import {SnackbarService} from "../snackbar/snackbar.service";
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class VersionService {

    private apiUrl = environment.apiBaseUrl + '/api/versions';

    private versions: Version[] = [];
    private versionUpdated = new Subject<Version[]>();

    constructor(private http: HttpClient, private snackBar: SnackbarService) {
        http.get<{ versions: any }>(this.apiUrl)
            .pipe(map(versionData => {
                return versionData.versions.map((version: any) => {
                    return {
                        id: version._id,
                        name: version.name,
                        status: version.status
                    };
                })
            }))
            .subscribe(mappedVersions => {
                this.versions = mappedVersions;
                this.versionUpdated.next([...this.versions]);
            });
    }

    getVersions(): void {
        this.versionUpdated.next([...this.versions]);
    }

    addVersion(name: string, status: boolean): void {
        const version: Version = {id: '', name: name, status: status};
        this.http.post<{versionId: string}>(this.apiUrl, version)
            .subscribe(responseData => {
                version.id = responseData.versionId;
                this.versions.push(version);
                this.versionUpdated.next([...this.versions]);
                this.snackBar.success('Version added successfully!');
            });
    }

    editVersion(id: string, name: string, status: boolean): void {
        const version: Version = {id: id, name: name, status: status};
        this.http.put( `${this.apiUrl}/${id}`, version)
            .subscribe(() => {
                // make versions immutable before send to view
                const updatedVersions = [...this.versions];
                const vIndex = updatedVersions.findIndex(v => v.id === version.id);
                updatedVersions[vIndex] = version;
                this.versions = updatedVersions;
                this.versionUpdated.next([...this.versions]);
                this.snackBar.success('Version updated successfully!');
            });
    }

    deleteVersion(id: string): void {
        this.http.delete(`${this.apiUrl}/${id}`)
            .subscribe(() => {
                this.versions = this.versions.filter(v => v.id !== id);
                this.versionUpdated.next([...this.versions]);
                this.snackBar.success('Version deleted successfully!');
            });
    }

    getVersionUpdatedListener(): Observable<Version[]> {
        return this.versionUpdated.asObservable();
    }

}

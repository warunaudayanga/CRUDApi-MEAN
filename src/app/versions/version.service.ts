import {Injectable} from '@angular/core';
import {Version} from "./version.modal";
import {Observable, Subject} from "rxjs";
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AppService} from "../app.service";

@Injectable({
    providedIn: 'root'
})
export class VersionService {

    private apiUrl = environment.apiBaseUrl + '/api/versions';
    private versions: Version[] = [];
    private versionUpdated: Subject<Version[]> = new Subject<Version[]>();

    constructor(
        private http: HttpClient,
        private app: AppService
    ) {
        app.showLoading();
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
                // trigger update event
                this.versionUpdated.next([...this.versions]);
                app.hideLoading();
            }, error => {
                app.hideLoading();
                console.log(error);
            });
    }

    getVersions(): void {
        this.versionUpdated.next([...this.versions]);
    }

    addVersion(name: string, status: boolean): void {
        const version: Version = {id: '', name: name, status: status};
        this.app.showLoading();
        this.http.post<{versionId: string}>(this.apiUrl, version)
            .subscribe(responseData => {
                version.id = responseData.versionId;
                this.versions.push(version);
                // trigger update event
                this.versionUpdated.next([...this.versions]);
                this.app.hideLoading();
                this.app.success('Version added successfully!');
            }, error => {
                this.app.hideLoading();
                console.log(error);
            });
    }

    editVersion(id: string, name: string, status: boolean): void {
        const version: Version = {id: id, name: name, status: status};
        this.app.showLoading();
        this.http.put( `${this.apiUrl}/${id}`, version)
            .subscribe(() => {
                // make versions immutable before send to view
                // clone versions
                const updatedVersions = [...this.versions];
                // search for old version by index
                const vIndex = updatedVersions.findIndex(v => v.id === version.id);
                // replace old version with new version in cloned array
                updatedVersions[vIndex] = version;
                // store cloned versions in original versions array
                this.versions = updatedVersions;
                // trigger update event
                this.versionUpdated.next([...this.versions]);
                this.app.hideLoading();
                this.app.success('Version updated successfully!');
            }, error => {
                this.app.hideLoading();
                console.log(error);
            });
    }

    deleteVersion(id: string): void {
        this.app.showLoading();
        this.http.delete(`${this.apiUrl}/${id}`)
            .subscribe(() => {
                this.versions = this.versions.filter(v => v.id !== id);
                // trigger update event
                this.versionUpdated.next([...this.versions]);
                this.app.hideLoading();
                this.app.success('Version deleted successfully!');
            }, error => {
                this.app.hideLoading();
                console.log(error);
            });
    }

    getVersionUpdatedListener(): Observable<Version[]> {
        return this.versionUpdated.asObservable();
    }

}

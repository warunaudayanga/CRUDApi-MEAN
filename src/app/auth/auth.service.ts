import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {AppService} from "../app.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = environment.apiBaseUrl + '/api/auth';
    private token: string | null = null;
    private authStatusListener: Subject<boolean> = new Subject<boolean>();
    private isAuthenticated: boolean = false;

    constructor(
        private http: HttpClient,
        private app: AppService,
        private router: Router
    ) { }

    getToken(): string | null {
        return this.token;
    }

    createUser(email: string, password: string) {
        const authData: AuthData = {email: email, password: password};
        this.app.showLoading();
        this.http.post<AuthData>(`${this.apiUrl}/signup`, authData)
            .subscribe(response => {
                console.log(response);
                this.app.hideLoading();
            }, error => {
                this.app.hideLoading();
                console.log(error);
            });
    }

    login(email: string, password: string) {
        const authData: AuthData = {email: email, password: password};
        this.app.showLoading();
        this.http.post<{token: string}>(`${this.apiUrl}/login`, authData)
            .subscribe(response => {
                if(response.token) {
                    this.token = response.token;
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    let ignored = this.router.navigate(['/']);
                }
                this.app.hideLoading();
            }, error => {
                this.app.hideLoading();
                console.log(error);
            });
    }

    getIsAuthenticated(): boolean {
        return this.isAuthenticated;
    }

    getAuthStatusListener(): Observable<boolean> {
        return this.authStatusListener.asObservable();
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        let ignored = this.router.navigate(['/']);
    }
}

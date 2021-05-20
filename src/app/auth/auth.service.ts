import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {AppService} from "../app.service";
import {AuthInfo} from "./auth-info.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = environment.apiBaseUrl + '/api/auth';
    private token: string | null = null;
    private tokenTimer!: NodeJS.Timer;
    private authStatusListener: Subject<boolean> = new Subject<boolean>();
    private isAuthenticated: boolean = false;

    constructor(
        private http: HttpClient,
        private app: AppService,
        private router: Router
    ) { }

    autoAuthUser(): void {
        const authInfo: AuthInfo | null = AuthService.getAuth();
        if(!authInfo) return;
        const expiresIn = authInfo.expirationDate.getTime() - new Date().getTime();
        if (expiresIn > 0) {
            this.token = authInfo.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    getToken(): string | null {
        return this.token;
    }

    createUser(email: string, password: string): void {
        const authData: AuthData = {email: email, password: password};
        this.app.showLoading();
        this.http.post<AuthData>(`${this.apiUrl}/signup`, authData)
            .subscribe(() => {
                this.app.hideLoading();
                this.app.success('Successfully signed up!')
                let ignored = this.router.navigate(['/login']);
            }, error => {
                if (error.error.error.errors.email.kind == 'unique') {
                    this.app.error('Email already exists!');
                } else {
                    this.app.error('Error occurred while creating user!');
                }
                this.app.hideLoading();
            });
    }

    getIsAuthenticated(): boolean {
        return this.isAuthenticated;
    }

    getAuthStatusListener(): Observable<boolean> {
        return this.authStatusListener.asObservable();
    }

    login(email: string, password: string): void {
        const authData: AuthData = {email: email, password: password};
        this.app.showLoading();
        this.http.post<{token: string, expiresIn: number}>(`${this.apiUrl}/login`, authData)
            .subscribe(response => {
                if(response.token) {
                    this.token = response.token;
                    const expirationDuration: number = response.expiresIn;
                    this.setAuthTimer(expirationDuration)
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const expirationDate = new Date(new Date().getTime() + expirationDuration * 1000);
                    AuthService.saveAuth(response.token, expirationDate);
                    let ignored = this.router.navigate(['/']);
                }
                this.app.hideLoading();
            }, error => {
                if(error.error.msg == 'invalid') {
                    this.app.error('Invalid email or password!')
                } else {
                    this.app.error('Error occurred while trying to login!')
                }
                this.app.hideLoading();
            });
    }

    logout(): void {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        AuthService.clearAuth();
        let ignored = this.router.navigate(['/']);
    }

    private setAuthTimer(duration: number): void {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000)
    }

    private static saveAuth(token: string, expirationDate: Date): void {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private static getAuth(): AuthInfo | null {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        if(!token || !expirationDate) {
            return null;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        };
    }

    private static clearAuth(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }
}

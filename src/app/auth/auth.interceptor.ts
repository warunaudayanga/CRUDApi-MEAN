import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const authToken: string | null = this.authService.getToken();
        const authRequest: HttpRequest<unknown> = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`)
        });
        return next.handle(authRequest);
    }
}

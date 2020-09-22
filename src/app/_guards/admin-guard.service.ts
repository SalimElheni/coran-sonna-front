import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../_services/auth.service';
import { LocalstorageService } from './../_services/local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
    constructor(
        private authService: AuthService,
        private _router: Router,
        private localStorage: LocalstorageService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.localStorage.getItem('isAdmin') == 'true') {
            return true;
        } else {
            this.localStorage.storeItem('isAdmin', 'false');
            // Store the attempted URL for redirecting
            this.authService.redirectUrl = state.url;

            this._router.navigateByUrl('/');
            return false;
        }
    }
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}

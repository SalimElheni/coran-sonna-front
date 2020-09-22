import { Injectable } from "@angular/core";
import { LocalstorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    redirectUrl = '';
    constructor(
        private localStorageService: LocalstorageService
    ) {}

    public isAuthenticated(): boolean {
        const token = this.localStorageService.getToken();
        return !!token;
    }
}

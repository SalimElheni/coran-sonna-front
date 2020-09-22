import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class LocalstorageService {
    constructor() {}
    public storeAuthentication(authentication: string) {
        localStorage.setItem('authentication', authentication);
    }
    public storeItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    public getItem(key: string) {
        return localStorage.getItem(key);
    }
    public storeUsername(authentication: string) {
        localStorage.setItem('authentication', authentication);
    }
    public storeToken(Token: string) {
        localStorage.setItem('Token', Token);
    }
    public storeUserData(userData: string) {
        localStorage.setItem('userdata', userData);
    }
    public getToken() {
        return localStorage.getItem('Token');
    }
    public getUsername() {
        return localStorage.getItem('authentication');
    }
    public getUserData() {
        return localStorage.getItem('userdata');
    }
    public clearUserData() {
        localStorage.setItem('userdata', '');
        return localStorage.removeItem('userdata');
    }
    public clearStorage() {
        localStorage.clear();
    }
    public destroyToken() {
        return localStorage.removeItem('Token');
    }
}

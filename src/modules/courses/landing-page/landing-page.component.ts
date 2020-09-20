import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { loginModel } from '../_models';

@Component({
    selector: 'sb-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
    isAdminLogin = false;
    model: loginModel = {
        password: '',
        email: '',
        isAdmin: false,
    };
    constructor(private router: Router) {}

    ngOnInit(): void {}
    onLogin() {
        this.model.isAdmin = this.isAdminLogin;
        if (this.model.isAdmin === true) {
            this.router.navigateByUrl('/courses/dashboard');
        } else {
            this.router.navigateByUrl('/courses/home');
        }
    }
}

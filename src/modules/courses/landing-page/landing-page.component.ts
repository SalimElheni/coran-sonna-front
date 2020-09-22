import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '@app/_services/local-storage.service';

import { loginModel } from '../_models';
import { CoursesService } from '../_services/courses.service';

import { AuthService } from './../../../app/_services/auth.service';

@Component({
    selector: 'sb-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
    isAdminLogin = false;
    model: loginModel = {
        Password: '',
        Email: '',
        IsAdmin: false,
    };
    constructor(
        private router: Router,
        private coursesService: CoursesService,
        private localStorage: LocalstorageService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            if (this.localStorage.getItem('isAdmin') == 'true') {
                this.router.navigateByUrl('/courses/dashboard');
            } else {
                this.router.navigateByUrl('/courses/home');
            }
        }
    }
    onLogin() {
        this.model.IsAdmin = this.isAdminLogin;
        this.coursesService.login(this.model).subscribe(results => {
            if (results.Success === true) {
                this.localStorage.storeItem('isAdmin', this.isAdminLogin + '');
                if (this.model.IsAdmin === true) {
                    this.localStorage.storeToken(this.hashCode(this.model.Password));
                    this.router.navigateByUrl('/courses/dashboard');
                } else {
                    this.localStorage.storeToken(this.hashCode(this.model.Password));
                    this.router.navigateByUrl('/courses/home');
                }
            } else alert(results.Errors[0]);
        });
    }

    hashCode(s: string): string {
        return (
            '' +
            s.split('').reduce(function (a, b) {
                a = (a << 5) - a + b.charCodeAt(0);
                return a & a;
            }, 0)
        );
    }
}

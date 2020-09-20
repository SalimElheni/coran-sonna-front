import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { loginModel } from '../_models';
import { CoursesService } from '../_services/courses.service';

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
    constructor(private router: Router, private coursesService: CoursesService) {}

    ngOnInit(): void {}
    onLogin() {
        this.model.IsAdmin = this.isAdminLogin;
        this.coursesService.login(this.model).subscribe(results => {
            if (results.Success === true) {
                if (this.model.IsAdmin === true) {
                    this.router.navigateByUrl('/courses/dashboard');
                } else {
                    this.router.navigateByUrl('/courses/home');
                }
            } else {
                alert(results.Errors[0]);
            }
        });
    }
}

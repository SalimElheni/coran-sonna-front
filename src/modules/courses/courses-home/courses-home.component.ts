import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '@app/_services/local-storage.service';

import { LinkModel } from '../_models';
import { CoursesService } from '../_services/courses.service';

@Component({
    selector: 'sb-courses-home',
    templateUrl: './courses-home.component.html',
    styleUrls: ['./courses-home.component.scss'],
})
export class CoursesHomeComponent implements OnInit {
    courses: LinkModel[] = [];
    liveLink = {} as LinkModel;
    isAdmin = false;
    public isMenuCollapsed = true;
    constructor(
        public coursesService: CoursesService,
        private localStorage: LocalstorageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.isAdmin = this.localStorage.getItem('isAdmin') === 'true';
        this.coursesService.getCourses().subscribe(results => {
            if (results.Success === true) {
                this.courses = results.Body;
                if (this.courses && Array.isArray(this.courses) && this.courses.length > 0) {
                    this.courses.sort((x, y) => {
                        return x.Id == y.Id ? 0 : x.Id > y.Id ? -1 : 1;
                    });
                }
            }
        });
        this.coursesService.getLiveLink().subscribe(results => {
            if (results.Success === true) {
                this.liveLink = results.Body;
            }
        });
    }
    opnLiveLnk() {
        window.open(this.liveLink.Link, '_blank');
    }
    opnCoursLink(course: LinkModel) {
        window.open(course.Link, '_blank');
    }
    onLogout() {
        this.localStorage.destroyToken();
        this.router.navigateByUrl('/');
    }
}

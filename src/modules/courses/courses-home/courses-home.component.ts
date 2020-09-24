import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '@app/_services/local-storage.service';

import { LinkModel } from '../_models';
import { CoursesService } from '../_services/courses.service';
import { NewsService } from '../_services/news.service';

@Component({
    selector: 'sb-courses-home',
    templateUrl: './courses-home.component.html',
    styleUrls: ['./courses-home.component.scss'],
})
export class CoursesHomeComponent implements OnInit {
    news: LinkModel[] = [];
    courses: LinkModel[] = [];
    liveLink = {} as LinkModel;
    isAdmin = false;
    public isMenuCollapsed = true;
    constructor(
        private newsService:NewsService,
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
        this.newsService.getAll().subscribe(results => {
            if (results.Success === true) {
                this.news = results.Body;
                if (this.news && Array.isArray(this.news) && this.news.length > 0) {
                    this.news.sort((x, y) => {
                        return x.Id == y.Id ? 0 : x.Id > y.Id ? -1 : 1;
                    });
                }
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

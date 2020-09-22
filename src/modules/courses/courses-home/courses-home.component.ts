import { Component, OnInit } from '@angular/core';

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
    constructor(public coursesService: CoursesService) {}

    ngOnInit(): void {
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
}

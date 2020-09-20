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
    constructor(public coursesService: CoursesService) {}

    ngOnInit(): void {
        this.coursesService.getCourse().subscribe(results => {
            if (results.Success === true) {
                this.courses = results.Body;
            }
        });
    }
}

import {
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { CountryService } from '@modules/tables/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { CourseModalComponent } from '../course-modal/course-modal.component';
import { LinkModel } from '../_models';
import { CoursesService } from '../_services/courses.service';

@Component({
    selector: 'sb-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    @Input() pageSize = 4;

    countries$!: Observable<Country[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;

    courses: LinkModel[] = [];
    liveUrl = 'hhhhhhhhhhhhhhhhhhhhhhhhh';

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        public coursesService: CoursesService,
        public countryService: CountryService,
        private changeDetectorRef: ChangeDetectorRef,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.countryService.pageSize = this.pageSize;
        this.countries$ = this.countryService.countries$;
        this.total$ = this.countryService.total$;

        this.coursesService.getCourse().subscribe(results => {
            if (results.Success === true) {
                this.courses = results.Body;
            }
        });
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.countryService.sortColumn = column;
        this.countryService.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }
    onAddCourse() {
        const modalRef = this.modalService.open(CourseModalComponent, { size: 'lg' });
        // modalRef.componentInstance.user = this.user;
    }
}

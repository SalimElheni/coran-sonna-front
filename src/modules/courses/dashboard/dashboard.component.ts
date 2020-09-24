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
    coursesALL: LinkModel[] = [];
    liveLink = {} as LinkModel;
    isLiveUrlDisabled = true;

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

        this.loadData();
    }
    loadData() {
        this.coursesService.getCourses().subscribe(results => {
            if (results.Success === true) {
                this.courses = results.Body;
                this.coursesALL = [...this.courses];
            }
        });

        this.coursesService.getLiveLink().subscribe(results => {
            if (results.Success === true) {
                this.liveLink = results.Body;
            }
        });
    }
    onSaveLiveLink() {
        this.isLiveUrlDisabled = !this.isLiveUrlDisabled;
        this.coursesService.setLiveLink(this.liveLink).subscribe();
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
        modalRef.componentInstance.model = {
            Id: -1,
            Link: '',
            Description: '',
            Title: '',
        } as LinkModel;
        modalRef.componentInstance.title = 'Course';
        const newCourse = modalRef.componentInstance.model;
        modalRef.result.then(
            data => {
                this.coursesService.addCourse(newCourse).subscribe(results => {
                    this.loadData();
                });
            },
            reason => {}
        );
        console.log('---', modalRef.componentInstance.model);
    }
    onEditCourse(item: LinkModel) {
        const modalRef = this.modalService.open(CourseModalComponent, { size: 'lg' });
        modalRef.componentInstance.model = item;
        modalRef.componentInstance.title = 'Course';
        const editedCourse = modalRef.componentInstance.model;
        modalRef.result.then(
            data => {
                this.coursesService.editCourse(editedCourse).subscribe(results => {
                    this.loadData();
                });
            },
            reason => {}
        );
    }
    onDeleteCountry(item: LinkModel) {
        if (confirm(`Are you sure to delete "${item.Title}" ?`)) {
            this.coursesService.deleteCourse(item.Id).subscribe(results => {
                this.loadData();
            });
        }
    }
    onSearchChange(text: string) {
        if (text && text.length > 1) {
            const query = text.toLocaleLowerCase();
            this.courses = this.coursesALL.filter(
                x =>
                    x.Title.toLocaleLowerCase().includes(query) ||
                    x.Description.toLocaleLowerCase().includes(query)
            );
        } else {
            this.courses = [...this.coursesALL];
        }
    }
}

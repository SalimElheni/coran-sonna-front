import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LinkModel } from '../_models';

@Component({
    selector: 'sb-course-modal',
    templateUrl: './course-modal.component.html',
    styleUrls: ['./course-modal.component.scss'],
})
export class CourseModalComponent implements OnInit {
    model: LinkModel = {} as LinkModel;
    constructor(public modal: NgbActiveModal) {}

    ngOnInit(): void {}
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}

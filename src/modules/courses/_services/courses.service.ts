import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { LinkModel, ResponseModel } from '../_models';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    url = `${environment.api}/Course`;
    constructor(private http: HttpClient) {}

    getCourse() {
        return this.http.get<ResponseModel<LinkModel[]>>(`${this.url}/getall`);
    }
}

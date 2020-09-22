import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { LinkModel, loginModel, ResponseModel } from '../_models';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    url = `${environment.api}/Course`;
    constructor(private http: HttpClient) {}

    getCourses() {
        return this.http.get<ResponseModel<LinkModel[]>>(`${this.url}/getall`);
    }
    getCourse(id: number) {
        return this.http.get<ResponseModel<LinkModel>>(`${this.url}/get?id=${id}`);
    }
    addCourse(data: LinkModel) {
        return this.http.post<ResponseModel<number>>(`${this.url}/add`, data);
    }
    editCourse(data: LinkModel) {
        return this.http.post<ResponseModel<number>>(`${this.url}/update`, data);
    }
    deleteCourse(id: number) {
        return this.http.get<ResponseModel<number>>(`${this.url}/delete?id=${id}`);
    }
    login(data: loginModel) {
        return this.http.post<ResponseModel<number>>(`${environment.api}/user/auth`, data);
    }

    getLiveLink() {
        return this.http.get<ResponseModel<LinkModel>>(`${this.url}/getLiveLink`);
    }
    setLiveLink(link: LinkModel) {
        return this.http.post<ResponseModel<string>>(`${this.url}/setLiveLink`, link);
    }
}

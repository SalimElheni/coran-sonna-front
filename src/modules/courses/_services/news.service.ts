import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ResponseModel, LinkModel } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  url = `${environment.api}/News`;

  constructor(private http: HttpClient) { }
  // -- News
  getAll() {
    return this.http.get<ResponseModel<LinkModel[]>>(`${this.url}/getAll`);
  }
  get(id: number) {
    return this.http.get<ResponseModel<LinkModel>>(`${this.url}/get?id=${id}`);
  }
  addNews(data: LinkModel) {
    return this.http.post<ResponseModel<number>>(`${this.url}/add`, data);
  }
  editNews(data: LinkModel) {
    return this.http.post<ResponseModel<number>>(`${this.url}/update`, data);
  }
  deleteNews(id: number) {
    return this.http.get<ResponseModel<number>>(`${this.url}/deleteNews?id=${id}`);
  }
}

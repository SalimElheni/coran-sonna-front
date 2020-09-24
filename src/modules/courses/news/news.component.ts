import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CountryService } from '@modules/tables/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseModalComponent } from '../course-modal/course-modal.component';
import { LinkModel } from '../_models';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'sb-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  courses: LinkModel[] = [];
  coursesALL: LinkModel[] = [];
  constructor(
    public newsService: NewsService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.newsService.getAll().subscribe(results => {
      if (results.Success === true) {
        this.courses = results.Body;
        this.coursesALL = [...this.courses];
      }
    });

  }
  onAddCourse() {
    const modalRef = this.modalService.open(CourseModalComponent, { size: 'lg' });
    modalRef.componentInstance.model = {
      Id: -1,
      Link: '',
      Description: '',
      Title: '',
    } as LinkModel;
    modalRef.componentInstance.title = 'News';
    const newCourse = modalRef.componentInstance.model;
    modalRef.result.then(
      data => {
        this.newsService.addNews(newCourse).subscribe(results => {
          this.loadData();
        });
      },
      reason => { }
    );
    console.log('---', modalRef.componentInstance.model);
  }
  onEditCourse(item: LinkModel) {
    const modalRef = this.modalService.open(CourseModalComponent, { size: 'lg' });
    modalRef.componentInstance.model = item;
    modalRef.componentInstance.title = 'News';
    const editedCourse = modalRef.componentInstance.model;
    modalRef.result.then(
      data => {
        this.newsService.editNews(editedCourse).subscribe(results => {
          this.loadData();
        });
      },
      reason => { }
    );
  }
  onDeleteCountry(item: LinkModel) {
    if (confirm(`Are you sure to delete "${item.Title}" ?`)) {
      this.newsService.deleteNews(item.Id).subscribe(results => {
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

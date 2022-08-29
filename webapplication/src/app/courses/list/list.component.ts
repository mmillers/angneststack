import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { Courses } from '../../shared/interfaces/courses.interface';
import { CoursesService } from '../../shared/services/courses.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  tableHeaders = ['ID', 'DESCRIÇÃO', '#'];
  pdfHeaders = ['ID', 'DESCRIÇÃO', 'EMENTA'];
  dataSource!: Array<Courses>;
  course!: Courses;
  isActivated = true;

  constructor(
    private readonly _router: Router,
    public readonly _coursesService: CoursesService,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnDestroy(): void {
    this.isActivated = false;
  }

  loadCourses() {
    this._coursesService.findAll()
      .pipe(takeWhile(() => this.isActivated))
      .subscribe((courses: Array<Courses>) => this.dataSource = courses)
  }

  edit(course: Courses) {
    this._router.navigateByUrl(`courses/${course.code}`);
  }

  viewDetail(course: Courses) {
    this._coursesService.findOne(course.code)
      .subscribe((course: Courses) => this.course = course);
  }
}

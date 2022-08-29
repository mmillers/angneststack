import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Courses } from '../../interfaces/courses.interface';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-enroll-on-courses',
  templateUrl: './enroll-on-courses.component.html',
  styleUrls: ['./enroll-on-courses.component.scss']
})
export class EnrollOnCoursesComponent implements OnInit, OnDestroy {

  @Output() closeEventEmitter = new EventEmitter();
  @Output() saveEventEmitter = new EventEmitter<{ ids: Array<number>, courses: Array<Courses> }>();
  courses!: Array<Courses>;
  markAll = false;
  activated = true;
  coursesAddedId = new Array<number>();
  coursesAdded = new Array<Courses>();

  constructor(private readonly _coursesService: CoursesService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnDestroy(): void {
    this.activated = false;
  }

  loadCourses() {
    this._coursesService.findAll()
      .pipe(takeWhile(() => this.activated))
      .subscribe((courses: Array<Courses>) => this.courses = courses);
  }

  add(student: Courses) {
    this.coursesAddedId.push(student.code);
    this.coursesAdded.push(student);
  }

  save() {
    this.saveEventEmitter.emit({ ids: this.coursesAddedId, courses: this.coursesAdded });
  }

  close() {
    this.closeEventEmitter.emit();
  }
}

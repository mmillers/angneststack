import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Students } from '../../interfaces/students.interface';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-enroll-students-in-courses',
  templateUrl: './enroll-students-in-courses.component.html',
  styleUrls: ['./enroll-students-in-courses.component.scss']
})
export class EnrollStudentsInCoursesComponent implements OnInit {

  @Output() closeEventEmitter = new EventEmitter();
  @Output() saveEventEmitter = new EventEmitter<{ ids: Array<number>, students: Array<Students> }>();
  students!: Array<Students>;
  markAll = false;
  activated = true;
  studentsAddedId = new Array<number>();
  studentsAdded = new Array<Students>();

  constructor(private readonly _studentsService: StudentsService) {}

  ngOnInit(): void {
    this._studentsService.findAll()
      .pipe(takeWhile(() => this.activated))
      .subscribe((students: Array<Students>) => this.students = students);
  }

  add(student: Students) {
    this.studentsAddedId.push(student.code);
    this.studentsAdded.push(student);
  }

  save() {
    this.saveEventEmitter.emit({ ids: this.studentsAddedId, students: this.studentsAdded });
  }

  close() {
    this.closeEventEmitter.emit();
  }
}

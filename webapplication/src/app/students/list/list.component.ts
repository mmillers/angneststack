import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { Students } from '../../shared/interfaces/students.interface';
import { StudentsService } from '../../shared/services/students.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  tableHeaders = ['ID', 'NOME', '#'];
  pdfHeaders = ['ID', 'NOME'];
  student!: Students;
  dataSource!: Array<Students>;
  isActivated = true;

  constructor(
    private readonly _router: Router,
    public readonly _studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  ngOnDestroy(): void {
    this.isActivated = false;
  }

  loadStudents() {
    this._studentsService.findAll()
      .pipe(takeWhile(() => this.isActivated))
      .subscribe((students: Array<Students>) => this.dataSource = students);
  }

  edit(student: Students) {
    this._router.navigateByUrl(`students/${student.code}`);
  }

  viewDetail(student: Students) {
    this._studentsService.findOne(student.code)
      .subscribe((student: Students) => this.student = student);
  }
}

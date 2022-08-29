import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Courses } from '../../shared/interfaces/courses.interface';
import { Students } from '../../shared/interfaces/students.interface';
import { CoursesService } from '../../shared/services/courses.service';
import { NotificationsService } from '../../shared/services/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  showEnrollStudentInCourses!: boolean;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _coursesService: CoursesService,
    private readonly _notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.formBuilder();
  }

  getParams() {
    this._activatedRoute.paramMap
      .subscribe((params: ParamMap) => {
        if (params.has('code'))
          this.loadCourse(Number.parseInt(params.get('code')!));
      });
  }

  formBuilder() {
    this.form = new FormGroup({
      code: new FormControl(),
      description: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(50)])),
      program: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(4000)])),
      students_id: new FormControl([]),
      students: new FormArray([])
    });
  }

  get students() {
    return this.form.controls.students as FormArray;
  }

  loadCourse(code: number) {
    this._coursesService.findOne(code)
      .subscribe(course => this.fillForm(course));
  }

  fillForm(course: Courses) {
    this.form.patchValue(course);
    this.form.controls.students_id.setValue(course.students?.map(student => student.code));
    this.fillStudentsFormArray(course.students);
  }

  fillStudentsFormArray(students: Array<Students>) {
    students?.filter(student => {
      const studentForm = new FormGroup({
        code: new FormControl(),
        name: new FormControl()
      });
      studentForm.setValue(student);
      this.students.push(studentForm);
    });
  }

  save() {
    const course = this.form.getRawValue();
    course.code ? this.update(course) :
      this.add(course);
  }

  private add(course: Courses) {
    this._coursesService.create(course)
      .subscribe(() => {
        this._notificationService.showNotificationSuccess('Curso adicionado com sucesso');
        this.redirect();
      });
  }

  private update(course: Courses) {
    this._coursesService.update(course)
      .subscribe(() => {
        this._notificationService.showNotificationSuccess('Curso atualizado com sucesso');
        this.formBuilder();
        this.loadCourse(course.code);
      });
  }

  redirect() {
    this._router.navigateByUrl('/courses');
  }

  remove(i: number, code: number) {
    this.students.removeAt(i);
    this.removeId(code);
  }

  removeId(code: number) {
    const studentsId: Array<number> = this.form.controls.students_id.value;
    this.form.controls.students_id.setValue(studentsId.filter(studentId => studentId !== code));
  }

  enrollStudent() {
    this.showEnrollStudentInCourses = !this.showEnrollStudentInCourses;
  }

  saveNewStudents(data: any) {
    this.enrollStudent();
    this.form.controls.students_id.setValue(data.ids.concat(this.form.controls.students_id.value));
    this.fillStudentsFormArray(data.students);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Courses } from '../../shared/interfaces/courses.interface';
import { Students } from '../../shared/interfaces/students.interface';
import { NotificationsService } from '../../shared/services/notifications.service';
import { StudentsService } from '../../shared/services/students.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  showEnrollStudent!: boolean;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _studentsService: StudentsService,
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
          this.loadStudent(Number.parseInt(params.get('code')!));
      });
  }

  formBuilder() {
    this.form = new FormGroup({
      code: new FormControl(),
      name: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(50)])),
      courses_id: new FormControl([]),
      courses: new FormArray([])
    });
  }

  get courses() {
    return this.form.controls.courses as FormArray;
  }

  loadStudent(code: number) {
    this._studentsService.findOne(code)
      .subscribe(student => this.fillForm(student));
  }

  fillForm(student: Students) {
    this.form.patchValue(student);
    this.form.controls.courses_id.setValue(student.courses?.map(course => course.code));
    this.fillCoursesFormArray(student.courses);
  }

  fillCoursesFormArray(courses: Array<Courses>) {
    courses?.filter(course => {
      const courseForm = new FormGroup({
        code: new FormControl(),
        description: new FormControl(),
        program: new FormControl()
      });
      courseForm.setValue(course);
      this.courses.push(courseForm);
    });
  }

  save() {
    const student = this.form.getRawValue();
    student.code ? this.update(student) :
      this.add(student);
  }

  private add(student: Students) {
    this._studentsService.create(student)
    this._notificationService.showNotificationSuccess('Aluno adicionado com sucesso');
    this.redirect();
  }

  private update(student: Students) {
    this._studentsService.update(student)
      .subscribe(() => {
        this._notificationService.showNotificationSuccess('Aluno atualizado com sucesso');
        this.formBuilder();
        this.loadStudent(student.code);
      });
  }

  redirect() {
    this._router.navigateByUrl('/students');
  }

  remove(i: number, code: number) {
    this.courses.removeAt(i);
    this.removeId(code);
  }

  removeId(code: number) {
    const coursesId: Array<number> = this.form.controls.courses_id.value;
    this.form.controls.courses_id.setValue(coursesId.filter(courseId => courseId !== code));
  }

  enrollOnCourse() {
    this.showEnrollStudent = !this.showEnrollStudent;
  }

  saveNewCourses(data: any) {
    this.enrollOnCourse();
    this.form.controls.courses_id.setValue(data.ids.concat(this.form.controls.courses_id.value));
    this.fillCoursesFormArray(data.courses);
  }
}

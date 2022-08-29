import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { BackButtonDirective } from './directives/back-button.directive';
import { InfoDetailDirective } from './directives/info-detail.directive';
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor';
import { LoadingInterceptor } from './interceptors/loading-interceptor';
import { DetailComponent } from './modals/detail/detail.component';
import { EnrollOnCoursesComponent } from './modals/enroll-on-courses/enroll-on-courses.component';
import { EnrollStudentsInCoursesComponent } from './modals/enroll-students-in-courses/enroll-students-in-courses.component';
import { LoadingComponent } from './modals/loading/loading.component';
import { CoursesService } from './services/courses.service';
import { StudentsService } from './services/students.service';

@NgModule({
  declarations: [
    HeaderComponent,
    TableComponent,
    ButtonComponent,
    BackButtonDirective,
    LoadingComponent,
    DetailComponent,
    InfoDetailDirective,
    EnrollStudentsInCoursesComponent,
    EnrollOnCoursesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    CoursesService,
    StudentsService,
    {
			provide: HTTP_INTERCEPTORS,
			useClass: LoadingInterceptor,
			multi: true,
		},
    {
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
			multi: true,
		},
  ],
  exports: [
    HeaderComponent,
    TableComponent,
    ButtonComponent,
    BackButtonDirective,
    LoadingComponent,
    DetailComponent,
    EnrollStudentsInCoursesComponent,
    EnrollOnCoursesComponent
  ]
})
export class SharedModule {}

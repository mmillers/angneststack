import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Courses } from '../interfaces/courses.interface';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<Array<Courses>> {
    return this.httpClient.get<Array<Courses>>(`${environment.url}/courses`);
  }

  findOne(code: number): Observable<Courses> {
    return this.httpClient.get<Courses>(`${environment.url}/courses/${code}`);
  }

  create(formValue: any): Observable<Courses> {
    return this.httpClient.post<Courses>(`${environment.url}/courses`, formValue);
  }

  update(formValue: any): Observable<boolean> {
    return this.httpClient.put<boolean>(`${environment.url}/courses/${formValue.code}`, formValue);
  }
}

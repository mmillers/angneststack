import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Students } from '../interfaces/students.interface';

@Injectable()
export class StudentsService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<Array<Students>> {
    return this.httpClient.get<Array<Students>>(`${environment.url}/students`);
  }

  findOne(code: number): Observable<Students> {
    return this.httpClient.get<Students>(`${environment.url}/students/${code}`);
  }

  create(formValue: any): Observable<Students> {
    return this.httpClient.post<Students>(`${environment.url}/students`, formValue);
  }

  update(formValue: any): Observable<boolean> {
    return this.httpClient.put<boolean>(`${environment.url}/students/${formValue.code}`, formValue);
  }
}

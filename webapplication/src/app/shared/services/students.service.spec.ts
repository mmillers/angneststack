import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Students } from '../interfaces/students.interface';
import { SharedModule } from '../shared.module';
import { StudentsService } from './students.service';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [StudentsService]
    });

    service = TestBed.inject(StudentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get array of students from findAll', () => {
    const students: Array<Students> = [
      { code: 1, name: 'teste', courses: [], courses_id: [] },
      { code: 2, name: 'teste', courses: [], courses_id: [] },
      { code: 3, name: 'teste', courses: [], courses_id: [] },
      { code: 4, name: 'teste', courses: [], courses_id: [] },
      { code: 5, name: 'teste', courses: [], courses_id: [] },
    ]
    service.findAll()
      .subscribe((response: Array<Students>) => {
        expect(response).toEqual(students);
      });

    const req = httpMock.expectOne('/api/students');
    expect(req.request.method).toBe('GET');
    req.flush(students);
  });

  it('should be add a student when create method is called', () => {
    const student: Students = { code: 1, name: 'teste', courses: [], courses_id: [] };
    service.create({ name: 'teste', courses_id: [] })
      .subscribe((response: Students) => {
        expect(response).toEqual(student);
      });
    const req = httpMock.expectOne('/api/students');
    expect(req.request.method).toBe('POST');
    req.flush(student);
  });
});

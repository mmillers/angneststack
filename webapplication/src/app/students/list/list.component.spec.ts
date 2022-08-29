import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Students } from '../../shared/interfaces/students.interface';
import { StudentsService } from '../../shared/services/students.service';
import { SharedModule } from '../../shared/shared.module';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [ListComponent],
      providers: [
        StudentsService,
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load students on init', () => {
    spyOn(component, 'loadStudents');
    component.ngOnInit();
    expect(component.loadStudents).toHaveBeenCalled();
  });

  it('should navigate on edit', fakeAsync(() => {
    let router = fixture.debugElement.injector.get(Router);
    component.edit({ code: 1, name: 'teste', courses: [], courses_id: [] } as Students);
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    const code = 1;
    expect(navArgs).withContext('should navigate to edit student')
      .toBe('students/' + code);
  }));
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSpy } from '../../../../tests/helpers/activated-router-spy';
import { NotificationsService } from '../../shared/services/notifications.service';
import { StudentsService } from '../../shared/services/students.service';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let activatedRouteSpy: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [RegisterComponent],
      providers: [
        StudentsService,
        NotificationsService,
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteSpy
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    activatedRouteSpy = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on init create student form and check if create or edit', () => {
    spyOn(component, 'getParams');
    component.ngOnInit();
    expect(component.getParams).toHaveBeenCalled();
    expect(component.form).toBeTruthy();
  });

  it('should call method loadStudent on edit', () => {
    spyOn(component, 'loadStudent');
    component.ngOnInit();
    expect(component.loadStudent).toHaveBeenCalled();
  });
});

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  declarations: [
    RegisterComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ]
})
export class StudentsModule {}

import { Module } from '@nestjs/common';
import { CoursesController } from './controllers/courses.controller';
import { StudentsController } from './controllers/students.controller';

@Module({
  imports: [],
  controllers: [
    StudentsController,
    CoursesController,
    ],
  providers: [],
})
export class AppModule {}

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AppController } from '../app.controller';
import { CreateCourseDTO } from '../dtos/courses/create-course.dto';
import { UpdateCourseDTO } from '../dtos/courses/update-course.dto';
import { ICourses } from '../interfaces/courses.interface';
import { ParseIntPipe } from '../pipes/parse-int.pipe';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController extends AppController {

    @Get()
    findAll(): Observable<Array<ICourses>> {
        return this.clientProxy.send('find-courses', []);
    }

    @Get(':code')
    findByCode(@Param('code', new ParseIntPipe()) code: number): Observable<ICourses> {
        return this.clientProxy.send('find-course-by-code', code);
    }

    @Post()
    create(@Body() createCourseDTO: CreateCourseDTO): Observable<ICourses> {
        return this.clientProxy.send('create-course', createCourseDTO);
    }

    @Put(':code')
    update(@Param('code', new ParseIntPipe()) code: number, @Body() updateCourseDTO: UpdateCourseDTO): Observable<any> {
        return this.clientProxy.emit('update-course', { updateCourseDTO, code });
    }
}

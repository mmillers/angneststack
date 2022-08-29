import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AppController } from '../app.controller';
import { CreateStudentDTO } from '../dtos/students/create-student.dto';
import { UpdateStudentDTO } from '../dtos/students/update-student.dto';
import { IStudents } from '../interfaces/students.interface';
import { ParseIntPipe } from '../pipes/parse-int.pipe';

@ApiTags('Students')
@Controller('students')
export class StudentsController extends AppController {

    @Get()
    findAll(): Observable<IStudents> {
        return this.clientProxy.send('find-students', []);
    }

    @Get(':code')
    findByCode(@Param('code', new ParseIntPipe()) code: number): Observable<IStudents> {
        return this.clientProxy.send('find-student-by-code', code);
    }

    @Post()
    create(@Body() createStudentDTO: CreateStudentDTO) {
        return this.clientProxy.send('create-student', createStudentDTO);
    }

    @Put(':code')
    update(@Body() updateStudentDTO: UpdateStudentDTO, @Param('code', new ParseIntPipe()) code: number,) {
        return this.clientProxy.emit('update-student', { code, updateStudentDTO });
    }
}

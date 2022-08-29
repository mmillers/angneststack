import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { StudentsEntity } from '../../../common/entities/students.entity';
import { CreateStudentDTO } from '../dtos/create-student.dto';
import { StudentsService } from '../service/students.service';

@Controller('students')
export class StudentsController {

    constructor(private readonly studentsService: StudentsService) {}

    @MessagePattern('find-students')
    async findAll(): Promise<Array<StudentsEntity>> {
        return await this.studentsService.findAll();
    }

    @MessagePattern('find-student-by-code')
    async findByCode(@Payload() code: number): Promise<StudentsEntity> {
        return await this.studentsService.findByCode(code);
    }

    @MessagePattern('create-student')
    async create(@Payload() createStudentDTO: CreateStudentDTO): Promise<StudentsEntity> {
        return await this.studentsService.create(createStudentDTO);
    }

    @EventPattern('update-student')
    async update(@Payload() data: any): Promise<void> {
        await this.studentsService.update(data.code, data.updateStudentDTO);
    }
}


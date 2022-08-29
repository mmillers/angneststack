import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsEntity } from 'src/common/entities/students.entity';
import { Repository } from 'typeorm';
import { CoursesEntity } from '../../../common/entities/courses.entity';
import { CreateStudentDTO } from '../dtos/create-student.dto';
import { UpdateStudentDTO } from '../dtos/update-student.dto';

@Injectable()
export class StudentsService {

    constructor(@InjectRepository(StudentsEntity) private readonly repository: Repository<StudentsEntity>) {}

    async findAll(): Promise<Array<StudentsEntity>> {
        return await this.repository.find();
    }

    async findByCode(code: number): Promise<StudentsEntity> {
        try {
            return await this.repository.findOneOrFail({ where: { code }, relations: ['courses'], order: { code: 'ASC', courses: { code: 'ASC' } } });
        } catch (e) {
            throw new RpcException(e.message);
        }
    }

    async create(createStudentDTO: CreateStudentDTO): Promise<StudentsEntity> {
        try {
            const studentToSave = this.repository.create(createStudentDTO);
            studentToSave.courses = this.createCoursesToSave(createStudentDTO.courses_id);
            return await this.repository.save(studentToSave);
        } catch (e) {
            throw new RpcException(e.message);
        }
    }

    async update(code: number, updateStudentDTO: UpdateStudentDTO): Promise<void> {
        try {
            const studentToUpdate = await this.findByCode(code);
            studentToUpdate.courses = this.createCoursesToSave(updateStudentDTO.courses_id);
            await this.repository.save(Object.assign(studentToUpdate, updateStudentDTO));
        } catch (e) {
            throw new RpcException(e.message);
        }
    }

    private createCoursesToSave(coursesId: Array<number>): Array<CoursesEntity> {
        return (coursesId && coursesId.length) ?
            coursesId.map(code => new CoursesEntity(code)) :
            (coursesId && !coursesId.length) ?
                [] :
                undefined;
    }
}

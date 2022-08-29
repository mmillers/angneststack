import { Controller } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesEntity } from 'src/common/entities/courses.entity';
import { StudentsEntity } from 'src/common/entities/students.entity';
import { NotFoundException } from 'src/common/exceptions/notfound.exception';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from '../dtos/create-course.dto';
import { UpdateCourseDTO } from '../dtos/update-course.dto';

@Controller('courses')
export class CoursesService {

    constructor(@InjectRepository(CoursesEntity) private readonly repository: Repository<CoursesEntity>) {}

    async findAll(): Promise<Array<CoursesEntity>> {
        return await this.repository.find();
    }

    async findByCode(code: number): Promise<CoursesEntity> {
        try {
            return await this.repository.findOneOrFail({ where: { code }, relations: ['students'], order: { code: 'ASC', students: { code: 'ASC' } } });
        } catch (e) {
            throw new NotFoundException();
        }
    }

    async create(createCourseDTO: CreateCourseDTO): Promise<CoursesEntity> {
        try {
            const courseToSave = this.repository.create(createCourseDTO);
            return await this.repository.save(courseToSave);
        } catch (e) {
            throw new RpcException(e.message);
        }
    }

    async update(code: number, updateCourseDTO: UpdateCourseDTO) {
        try {
            const courseToUpdate = await this.findByCode(code);
            courseToUpdate.students = this.createStudentsToSaveOnUpdate(updateCourseDTO.students_id);
            await this.repository.save(Object.assign(courseToUpdate, updateCourseDTO));
        } catch (e) {
            throw new RpcException(e.message);
        }
    }

    private createStudentsToSaveOnUpdate(studentsId: Array<number>): Array<StudentsEntity> {
        return (studentsId && studentsId.length) ?
            studentsId.map(code => new StudentsEntity(code)) :
            (studentsId && !studentsId.length) ?
                [] :
                undefined;
    }
}

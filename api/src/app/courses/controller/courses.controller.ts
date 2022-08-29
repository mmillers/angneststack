import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CoursesEntity } from '../../../common/entities/courses.entity';
import { CreateCourseDTO } from '../dtos/create-course.dto';
import { CoursesService } from '../service/courses.service';

@Controller('courses')
export class CoursesController {

    constructor(private readonly coursesService: CoursesService) {}

    @MessagePattern('find-courses')
    async findAll(): Promise<Array<CoursesEntity>> {
        return await this.coursesService.findAll();
    }

    @MessagePattern('find-course-by-code')
    async findByCode(@Payload() code: number): Promise<CoursesEntity> {
        return await this.coursesService.findByCode(code);
    }

    @MessagePattern('create-course')
    async create(@Payload() createCourseDTO: CreateCourseDTO): Promise<CoursesEntity> {
        return await this.coursesService.create(createCourseDTO);
    }

    @EventPattern('update-course')
    async update(@Payload() data: any): Promise<void> {
        await this.coursesService.update(data.code, data.updateCourseDTO);
    }
}

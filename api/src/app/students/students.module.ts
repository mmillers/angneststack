import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesEntity } from 'src/common/entities/courses.entity';
import { StudentsEntity } from 'src/common/entities/students.entity';
import { StudentsController } from './controller/students.controller';
import { StudentsService } from './service/students.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([StudentsEntity, CoursesEntity]),
    ],
    controllers: [StudentsController],
    providers: [StudentsService],
    exports: [StudentsService]
})
export class StudentsModule {}

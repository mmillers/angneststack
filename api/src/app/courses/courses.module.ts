import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesEntity } from 'src/common/entities/courses.entity';
import { CoursesController } from './controller/courses.controller';
import { CoursesService } from './service/courses.service';

@Module({
    imports: [TypeOrmModule.forFeature([CoursesEntity])],
    providers: [CoursesService],
    controllers: [CoursesController],
})
export class CoursesModule {}

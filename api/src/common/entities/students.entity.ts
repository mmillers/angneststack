import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CoursesEntity } from './courses.entity';

@Entity('students')
export class StudentsEntity extends BaseEntity {

    @Column()
    name: string;

    @ManyToMany(() => CoursesEntity, (course) => course.students)
    courses: CoursesEntity[];
}

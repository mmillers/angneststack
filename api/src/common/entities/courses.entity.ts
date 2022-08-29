import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StudentsEntity } from './students.entity';

@Entity('courses')
export class CoursesEntity extends BaseEntity{

    @Column()
    description: string;

    @Column()
    program: string;

    @ManyToMany(() => StudentsEntity, (student) => student.courses)
    @JoinTable({
        name: 'students_courses',
        joinColumn: {
            name: 'code_courses',
            foreignKeyConstraintName: 'courses_foreign_key'
        },
        inverseJoinColumn: {
            name: 'code_students',
            foreignKeyConstraintName: 'students_foreign_key'
        }
    })
    students: StudentsEntity[];
}

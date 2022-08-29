import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CoursesEntity } from 'src/common/entities/courses.entity';
import { StudentsEntity } from 'src/common/entities/students.entity';

export const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.host,
    port: parseInt(process.env.port, 10) || 3306,
    username: process.env.dbuser || 'root',
    password: process.env.password || 'root',
    database: process.env.database || 'vr',
    entities: [CoursesEntity, StudentsEntity],
    synchronize: false
}

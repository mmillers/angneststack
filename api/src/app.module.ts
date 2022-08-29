import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { CoursesModule } from './app/courses/courses.module';
import { StudentsModule } from './app/students/students.module';

@Module({
    imports: [
        StudentsModule,
        CoursesModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useFactory: () => (config)
        })
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

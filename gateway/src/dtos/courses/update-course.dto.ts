import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, Min } from 'class-validator';
import { CreateCourseDTO } from './create-course.dto';

export class UpdateCourseDTO extends CreateCourseDTO {

    @IsInt({ message: 'Código deve ser um número' })
    @Min(1, { message: 'Código deve ser maior que zero' })
    @ApiProperty({ description: 'Código do curso', example: '123' })
    code: number;

    @IsOptional()
    @IsArray({ message: 'Estudantes devem ser enviado como array de IDs' })
    @ApiPropertyOptional({ description: 'Array com IDs dos alunos do curso', example: [1, 2, 3] })
    students_id: Array<number>
}

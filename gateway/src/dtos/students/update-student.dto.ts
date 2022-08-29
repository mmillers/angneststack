import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { CreateStudentDTO } from './create-student.dto';

export class UpdateStudentDTO extends CreateStudentDTO {

    @IsInt({ message: 'Código deve ser um número' })
    @Min(1, { message: 'Código deve ser maior que zero' })
    @ApiProperty({ description: 'Código do aluno', example: '10' })
    code: number;
}

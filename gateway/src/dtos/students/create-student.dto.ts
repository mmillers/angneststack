import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateStudentDTO {

    @IsNotEmpty({ message: 'Nome deve ser informado' })
    @IsString({ message: 'Nome deve ser uma string' })
    @MaxLength(50, { message: 'Nome deve conter no máximo 50 dígitos' })
    @ApiProperty({ description: 'Nome do aluno', example: 'João da Silva' })
    name: string;

    @IsOptional()
    @IsArray({ message: 'Cursos devem ser enviado como array de IDs' })
    @ApiPropertyOptional({ description: 'Array com IDs dos cursos', example: [10, 20, 30] })
    courses_id: Array<number>
}

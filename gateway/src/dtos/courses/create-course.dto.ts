import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCourseDTO {

    @IsNotEmpty({ message: 'Descrição deve ser informado' })
    @IsString({ message: 'Descrição deve ser uma string' })
    @MaxLength(50, { message: 'Descrição deve conter no máximo 50 dígitos' })
    @ApiProperty({ description: 'Descrição do curso', example: 'Curso de IOT' })
    description: string;

    @IsNotEmpty({ message: 'Ementa deve ser informado' })
    @IsString({ message: 'Ementa deve ser uma string' })
    @ApiProperty({
        description: 'Ementa do curso',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet eros nec magna scelerisque, sit amet rhoncus massa varius. Quisque blandit lorem at arcu aliquet maximus. Sed vestibulum facilisis ante in efficitur. Quisque dapibus turpis diam, eu faucibus enim pharetra non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam cursus sapien in lorem ullamcorper, id tristique augue faucibus. Nulla ut leo quis augue rhoncus porta at id metus.\n Nunc efficitur non lacus vel feugiat. Aenean eleifend odio velit, non aliquam turpis mollis eget. Aliquam malesuada, augue at egestas suscipit, sem nulla blandit leo, vehicula rutrum erat libero eget felis. Cras orci felis, mattis vel commodo nec, suscipit nec felis. Proin in tortor eu mauris pretium tristique. Praesent quam velit, vulputate at purus sit amet, vestibulum volutpat libero. Nunc sagittis varius lorem eget laoreet. Aenean sit amet lobortis risus. Sed pellentesque egestas mattis. Fusce ac justo imperdiet, auctor justo eget, suscipit diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam justo leo, laoreet nec mi non, dapibus tempus neque.'
    })
    program: string;
}

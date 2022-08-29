import { CreateCourseDTO } from './create-course.dto';

export class UpdateCourseDTO extends CreateCourseDTO {
    code: number;
    students_id?: Array<number>;
}

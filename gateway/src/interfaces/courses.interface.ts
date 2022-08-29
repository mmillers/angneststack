import { IStudents } from "./students.interface";

export interface ICourses {
    code: number;
    description: string;
    program: string;
    courses: Array<IStudents>
}

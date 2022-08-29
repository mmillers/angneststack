import { ICourses } from "./courses.interface";

export interface IStudents {
    code: number;
    name: string;
    courses: Array<ICourses>
}

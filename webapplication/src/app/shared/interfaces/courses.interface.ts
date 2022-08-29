import { Students } from "./students.interface";

export interface Courses {
  code: number;
  description: string;
  program: string;
  students: Array<Students>;
  students_id: Array<number>;
}

import { Courses } from "./courses.interface";

export interface Students {
  code: number;
  name: string;
  courses_id: Array<number>;
  courses: Array<Courses>;
}

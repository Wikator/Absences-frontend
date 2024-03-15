import {AbsenceDto} from "./absence-dto";

export interface User {
  id: string;
  username: string;
  role: string;
  absences: AbsenceDto[];
}

import {User} from "./user";

export interface UserWithTokenDto extends User {
  token: string;
}

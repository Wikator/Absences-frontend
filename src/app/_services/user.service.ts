import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../_models/user";
import {HttpClient} from "@angular/common/http";
import {UpdateAbsencesCountDto} from "../_models/update-absences-count-dto";
import {UserEdit} from "../_models/user-edit";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl + 'users/';

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<User>(this.baseUrl);
  }

  updateAbsencesCount(updateAbsencesCountDto: UpdateAbsencesCountDto) {
    return this.http.put<User>(this.baseUrl + 'absences', updateAbsencesCountDto);
  }

  editUser(edit: UserEdit) {
    return this.http.put<User>(this.baseUrl, edit);
  }
}

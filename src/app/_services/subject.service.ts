import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {SubjectDto} from "../_models/subject-dto";
import {UpsertSubjectDto} from "../_models/upsert-subject-dto";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl = environment.apiUrl + 'subjects/';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<SubjectDto[]>(this.baseUrl);
  }

  getById(id: string) {
    return this.http.get<SubjectDto>(this.baseUrl + id);
  }

  add(subject: UpsertSubjectDto) {
    return this.http.post<SubjectDto>(this.baseUrl, subject);
  }

  update(id: string, subject: UpsertSubjectDto) {
    return this.http.put<SubjectDto>(this.baseUrl + id, subject);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}

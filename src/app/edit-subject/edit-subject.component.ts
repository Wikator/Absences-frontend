import {Component, Input} from '@angular/core';
import {SubjectService} from "../_services/subject.service";
import {Router} from "@angular/router";
import {SubjectDto} from "../_models/subject-dto";
import {UpsertSubjectDto} from "../_models/upsert-subject-dto";
import {BehaviorSubject, Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {SubjectFormComponent} from "../subject-form/subject-form.component";

@Component({
  selector: 'app-edit-subject',
  standalone: true,
  imports: [
    AsyncPipe,
    SubjectFormComponent
  ],
  templateUrl: './edit-subject.component.html',
  styleUrl: './edit-subject.component.css'
})
export class EditSubjectComponent {
  currentSubject$ = new Observable<SubjectDto | undefined>(undefined);
  @Input()
  set id(id: string) {
    this.currentSubject$ = this.subjectService.getById(id);
  }

  constructor(private subjectService: SubjectService,
              private router: Router) {}


  editSubject(id: string, subject: UpsertSubjectDto | null) {
    if (subject) {
      this.subjectService.update(id, subject).subscribe({
        next: () => this.router.navigateByUrl('/subjects')
      });
    } else {
      this.subjectService.delete(id).subscribe({
        next: () => this.router.navigateByUrl('/subjects')
      });
    }
  }
}

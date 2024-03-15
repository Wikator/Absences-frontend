import { Component } from '@angular/core';
import {SubjectService} from "../_services/subject.service";
import {UpsertSubjectDto} from "../_models/upsert-subject-dto";
import {Router} from "@angular/router";
import {SubjectFormComponent} from "../subject-form/subject-form.component";

@Component({
  selector: 'app-new-subject',
  standalone: true,
  imports: [
    SubjectFormComponent
  ],
  templateUrl: './new-subject.component.html',
  styleUrl: './new-subject.component.css'
})
export class NewSubjectComponent {

  constructor(private subjectService: SubjectService,
              private router: Router) {}

  addSubject(subject: UpsertSubjectDto) {
    this.subjectService.add(subject).subscribe({
      next: () => this.router.navigateByUrl('/subjects')
    });
  }
}

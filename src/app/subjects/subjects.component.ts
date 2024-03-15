import {Component, OnInit} from '@angular/core';
import {SubjectDto} from "../_models/subject-dto";
import { SubjectService } from '../_services/subject.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent implements OnInit {
  subjects: SubjectDto[] = [];

  constructor(private subjectService: SubjectService,
              private router: Router) { }

  ngOnInit(): void {
    this.subjectService.getAll().subscribe({
      next: (subjects: SubjectDto[]) => this.subjects = subjects
    });
  }

  navigateToSubject(id: string) {
    this.router.navigateByUrl(`/subjects/${id}`);
  }
}

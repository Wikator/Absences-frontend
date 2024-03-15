import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UpsertSubjectDto} from "../_models/upsert-subject-dto";

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.css'
})
export class SubjectFormComponent implements OnInit {
  @Output() onSubmit: EventEmitter<UpsertSubjectDto | null> = new EventEmitter<UpsertSubjectDto | null>();
  @Input() initialSubject: UpsertSubjectDto | null = null;
  @Input() deleteButtonVisible: boolean = false;
  subjectForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.subjectForm = this.fb.group({
      name: [this.initialSubject?.name, [Validators.required]],
      maxAbsences: [this.initialSubject?.maxAbsences, [Validators.required, Validators.min(0), Validators.max(15)]],
      facultyType: [this.initialSubject?.facultyType, [Validators.required, Validators.min(0), Validators.max(2)]]
    });
  }

  submit() {
    if (this.subjectForm.valid) {
      const subject = this.subjectForm.value as UpsertSubjectDto;
      this.onSubmit.emit(subject);
    }
  }

  delete() {
    this.onSubmit.emit(null);
  }
}

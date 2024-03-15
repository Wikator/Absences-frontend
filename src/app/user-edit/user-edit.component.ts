import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SubjectDto} from "../_models/subject-dto";
import {SubjectService} from "../_services/subject.service";
import {Router} from "@angular/router";
import {UserEdit} from "../_models/user-edit";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  subjects: SubjectDto[] = [];

  constructor(private subjectService: SubjectService, private userService: UserService,
              private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.subjectService.getAll().subscribe({
      next: subjects => this.subjects = subjects,
      error: err => console.log(err)
    });

    this.initializeForm();
  }

  get faculty1Subjects() {
    return this.subjects
      .filter(s => s.facultyType === 1 && s.id !== this.editForm.controls['faculty2'].value);
  }

  get faculty2Subjects() {
    return this.subjects
      .filter(s => s.facultyType === 1 && s.id !== this.editForm.controls['faculty1'].value);
  }

  get faculty3Subjects() {
    return this.subjects.filter(s => s.facultyType === 2);
  }

  private initializeForm() {
    this.editForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      faculty1: [''],
      faculty2: [''],
      faculty3: ['']
    });

    this.userService.getUser().subscribe({
      next: user => {
        this.editForm.controls['username'].setValue(user.username);
        this.editForm.controls['faculty1'].setValue(user.absences.find(a => a.subject.facultyType === 1)?.subject.id ?? '');
        this.editForm.controls['faculty2'].setValue(user.absences.find(a => a.subject.facultyType === 1 &&
          a.subject.id != this.editForm.controls['faculty1'].value)?.subject.id ?? '');
        this.editForm.controls['faculty3'].setValue(user.absences.find(a => a.subject.facultyType === 2)?.subject.id ?? '');
      },
      error: err => console.log(err)
    });
  }

  edit() {
    const editDto = this.editForm.value as UserEdit;

    this.userService.editUser(editDto).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error) => console.log(error)
    });
  }
}

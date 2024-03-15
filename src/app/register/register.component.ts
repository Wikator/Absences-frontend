import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {RegisterDto} from "../_models/register-dto";
import {SubjectDto} from "../_models/subject-dto";
import {SubjectService} from "../_services/subject.service";
import {of} from "rxjs";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  subjects: SubjectDto[] = [];

  constructor(private accountService: AccountService, private subjectService: SubjectService,
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
      .filter(s => s.facultyType === 1 && s.id !== this.registerForm.controls['faculty2'].value);
  }

  get faculty2Subjects() {
    return this.subjects
      .filter(s => s.facultyType === 1 && s.id !== this.registerForm.controls['faculty1'].value);
  }

  get faculty3Subjects() {
    return this.subjects.filter(s => s.facultyType === 2);
  }

  private initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      passwordConfirmation: ['', [Validators.required, this.matchValues('password')]],
      faculty1: [''],
      faculty2: [''],
      faculty3: ['']
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['passwordConfirmation'].updateValueAndValidity()
    })
  }

  private matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }

  register() {
    const registerDto = this.registerForm.value as RegisterDto;

    this.accountService.register(registerDto).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error) => console.log(error)
    });
  }

  protected readonly of = of;
}

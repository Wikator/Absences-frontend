import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from "@angular/router";
import {AccountService} from "../_services/account.service";
import {LoginDto} from "../_models/login-dto";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService, private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    const loginDto = this.loginForm.value as LoginDto;

    this.accountService.login(loginDto).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error) => console.log(error)
    });
  }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import {User} from "../_models/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RegisterDto} from "../_models/register-dto";
import {LoginDto} from "../_models/login-dto";
import {UserWithTokenDto} from "../_models/user-with-token-dto";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<UserWithTokenDto | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  private baseUrl = environment.apiUrl + 'account/';

  constructor(private http: HttpClient) { }

  register(registerDto: RegisterDto) {
    return this.http.post<UserWithTokenDto>(this.baseUrl + 'register', registerDto).pipe(
      map((user: UserWithTokenDto) => this.setCurrentUserWithToken(user))
    );
  }

  login(loginDto: LoginDto) {
    return this.http.post<UserWithTokenDto>(this.baseUrl + 'login', loginDto).pipe(
      map((user: UserWithTokenDto) => this.setCurrentUserWithToken(user))
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUserWithToken(user: UserWithTokenDto) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  updateCurrentUser(user: User) {
    const userString = localStorage.getItem('user');
    if (userString) {
      const token = JSON.parse(userString).token;
      const userWithToken: UserWithTokenDto = {...user, token: token};
      localStorage.setItem('user', JSON.stringify(userWithToken));
      this.currentUserSource.next(userWithToken);
    } else {
      localStorage.removeItem('user');
      this.currentUserSource.next(null);
    }
  }
}

import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountService } from './_services/account.service';
import {User} from "./_models/user";
import {NavbarComponent} from "./navbar/navbar.component";
import {UserWithTokenDto} from "./_models/user-with-token-dto";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'absences-frontend';

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    const userString = localStorage.getItem('user');

    if (!userString) return
    console.log(userString)

    const currentUser: UserWithTokenDto = JSON.parse(userString);
    const decodedToken = JSON.parse(atob(currentUser.token.split('.')[1]));
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('user');
    } else {
      console.log('setting current user')
      this.accountService.setCurrentUserWithToken(currentUser);
    }
  }
}

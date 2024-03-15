import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {AccountService} from "../_services/account.service";
import {LoggedInDirective} from "../_directives/logged-in.directive";
import {IsAdminDirective} from "../_directives/is-admin.directive";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    LoggedInDirective,
    IsAdminDirective
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private accountService: AccountService) { }

  logout() {
    this.accountService.logout();
  }
}

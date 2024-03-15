import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../_services/account.service";
import {map} from "rxjs";

export const loggedInGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  return accountService.currentUser$.pipe(
    map(user => user !== null)
  );
};

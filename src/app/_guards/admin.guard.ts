import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../_services/account.service";
import {map} from "rxjs";

export const adminGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  return accountService.currentUser$.pipe(
    map(user => user?.role === 'Admin')
  );
};

import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {AccountService} from "../_services/account.service";
import {take} from "rxjs";
import {User} from "../_models/user";
import {UserWithTokenDto} from "../_models/user-with-token-dto";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);

  accountService.currentUser$.pipe(take(1)).subscribe({
    next: (user: UserWithTokenDto | null) => {
      if (user) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`
          }
        });
      }
    }
  });

  return next(req);
}

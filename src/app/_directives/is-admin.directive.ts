import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AccountService} from "../_services/account.service";

@Directive({
  selector: '[appIsAdmin]',
  standalone: true
})
export class IsAdminDirective implements OnInit {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.accountService.currentUser$.subscribe({
      next: (user) => {
        this.viewContainerRef.clear();
        if (user && user.role === 'Admin') {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      }
    });
  }
}

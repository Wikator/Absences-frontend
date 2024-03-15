import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AccountService} from "../_services/account.service";

@Directive({
  selector: '[appLoggedIn]',
  standalone: true
})
export class LoggedInDirective implements OnInit {
  @Input() appLoggedIn: boolean = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.accountService.currentUser$.subscribe({
      next: (user) => {
        this.viewContainerRef.clear();
        if ((user !== null) === this.appLoggedIn) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      }
    });
  }
}

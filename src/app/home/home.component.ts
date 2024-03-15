import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {AccountService} from "../_services/account.service";
import {AsyncPipe, NgClass} from "@angular/common";
import {User} from "../_models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(public accountService: AccountService, private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: user => this.accountService.updateCurrentUser(user),
      error: () => this.router.navigateByUrl('/login')
    });

    this.accountService.currentUser$.subscribe({
      next: user => {
        if (!user) {
          this.router.navigateByUrl('/login')
        }
      }
    })
  }

  getProgressBarWidth(subjectId: string, user: User): number {
    const absences = user.absences.find(s => s.subject.id === subjectId)!.absencesCount;
    const maxAbsences = user.absences.find(s => s.subject.id === subjectId)!.subject.maxAbsences;
    return (absences / maxAbsences) * 100;
  }

  getProgressBarColor(subjectId: string, user: User): string {
    const width = Math.min(this.getProgressBarWidth(subjectId, user), 100);
    const hue = 120 - width * 1.2;
    return `hsl(${hue}, 100%, 50%)`;
  }

  incrementAbsencesCount(subjectId: string, user: User) {
    if (user.absences.some(a => a.subject.id === subjectId)) {
      const absence = user.absences.find(a => a.subject.id === subjectId);

      if (absence) {
        absence.absencesCount++;
        this.userService.updateAbsencesCount({ subjectId: subjectId, absencesCount: absence.absencesCount })
          .subscribe({
            next: () => this.accountService.updateCurrentUser(user),
            error: () => absence.absencesCount--
          });
      }
    }
  }

  decrementAbsencesCount(subjectId: string, user: User) {
    if (user.absences.some(a => a.subject.id === subjectId)) {
      const absence = user.absences.find(a => a.subject.id === subjectId);

      if (absence) {
        absence.absencesCount--;
        this.userService.updateAbsencesCount({ subjectId: subjectId, absencesCount: absence.absencesCount })
          .subscribe({
            next: () => this.accountService.updateCurrentUser(user),
            error: () => absence.absencesCount++
          });
      }
    }
  }
}

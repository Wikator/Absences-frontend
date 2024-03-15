import { Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {SubjectsComponent} from "./subjects/subjects.component";
import {adminGuard} from "./_guards/admin.guard";
import {NewSubjectComponent} from "./new-subject/new-subject.component";
import {EditSubjectComponent} from "./edit-subject/edit-subject.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {loggedInGuard} from "./_guards/logged-in.guard";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/edit', component: UserEditComponent, canActivate: [loggedInGuard] },
  { path: 'subjects', component: SubjectsComponent, canActivate: [adminGuard] },
  { path: 'subjects/new', component: NewSubjectComponent, canActivate: [adminGuard] },
  { path: 'subjects/:id', component: EditSubjectComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];

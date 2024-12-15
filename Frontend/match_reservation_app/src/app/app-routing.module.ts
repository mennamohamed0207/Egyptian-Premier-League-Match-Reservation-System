import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatchPageComponent } from './match-page/match-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { ProfileComponent } from './profile/profile.component';
import { AddStadiumComponent } from './add-stadium/add-stadium.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'match',
    component: MatchPageComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'add-match',
    component: AddMatchComponent,
  },
  {
    path: 'add-stadium',
    component: AddStadiumComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

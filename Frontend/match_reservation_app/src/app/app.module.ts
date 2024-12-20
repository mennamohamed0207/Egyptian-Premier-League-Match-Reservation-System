import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatchCardComponent } from './match-card/match-card.component';
import { MatchPageComponent } from './match-page/match-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddMatchComponent } from './add-match/add-match.component';
import { AddStadiumComponent } from './add-stadium/add-stadium.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CancelReservationDialogComponent } from './cancel-reservation-dialog/cancel-reservation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; // For buttons
import { MatIconModule } from '@angular/material/icon';
import { ReservationConfirmationDialogComponent } from './reservation-confirmation-dialog/reservation-confirmation-dialog.component';     // For icons (if needed)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomePageComponent,
    MatchCardComponent,
    MatchPageComponent,
    ProfilePageComponent,
    HeaderComponent,
    FooterComponent,
    AddMatchComponent,
    AddStadiumComponent,
    ProfileComponent,
    AdminComponent,
    CancelReservationDialogComponent,
    ReservationConfirmationDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
       
  ],
  providers: [provideClientHydration(withEventReplay()), provideAnimationsAsync(),provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}

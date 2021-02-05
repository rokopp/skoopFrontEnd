import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionsanswersComponent } from './components/questionsanswers/questionsanswers.component';
import { GreetingComponent } from './components/greeting/greeting.component';
import { ContactComponent } from './components/contact/contact.component';
import { RoomComponent } from './components/room/room.component';
import { MapComponent } from './components/map/map.component';
import { CreateNewRoomComponent } from './components/create-new-room/create-new-room.component';
import {FormsModule} from '@angular/forms';
import {GoPlayRoomsComponent} from './components/go-play-rooms/go-play-rooms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoomsComponent } from './components/users-rooms/users-rooms.component';
import { QuestionSetComponent } from './components/question-set/question-set.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { CreateMapComponent } from './components/create-map/create-map.component';
import { LocationSetsComponent } from './components/location-sets/location-sets.component';
import { QuestionSetsComponent } from './components/question-sets/question-sets.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { AlertsComponent } from './components/alerts/alerts.component';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from './components/oauth/oauth';
import {CommonModule} from '@angular/common';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    QuestionsanswersComponent,
    GreetingComponent,
    RoomComponent,
    ContactComponent,
    CreateNewRoomComponent,
    MapComponent,
    GoPlayRoomsComponent,
    UsersRoomsComponent,
    CreateMapComponent,
    LoginComponent,
    AlertsComponent,
    QuestionSetComponent,
    UsersRoomsComponent,
    LocationSetsComponent,
    QuestionSetsComponent,
    CreateMapComponent,
    LoginComponent,
    AlertsComponent
  ],
    imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatChipsModule,
      MatIconModule,
      CommonModule,
        MsalModule.forRoot({
          auth: {
            clientId: OAuthSettings.appId,
            authority: OAuthSettings.tenantID,
            redirectUri: OAuthSettings.redirectUri
          },
          cache: {
            cacheLocation: 'localStorage',
            // storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
          }
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

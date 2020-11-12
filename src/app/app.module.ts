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
import { CreateMapComponent } from './components/create-map/create-map.component';
import { LoginComponent } from './components/login/login.component';
import {fakeBackendProvider} from './components/_helpers/fake-backend';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BasicAuthInterceptor} from './components/_helpers/basic-auth.interceptor';
import {ErrorInterceptor} from './components/_helpers/error.interceptor';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

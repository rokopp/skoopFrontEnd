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
import { UsersRoomsComponent } from './components/users-rooms/users-rooms.component';

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
    UsersRoomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

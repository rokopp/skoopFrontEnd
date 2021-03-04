import { LocationSetsComponent } from './components/location-sets/location-sets.component';
import { CreateMapComponent } from './components/create-map/create-map.component';
import { MapComponent } from './components/map/map.component';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GreetingComponent} from './components/greeting/greeting.component';
import {QuestionsanswersComponent} from './components/questionsanswers/questionsanswers.component';
import {RoomComponent} from './components/room/room.component';
import {ContactComponent} from './components/contact/contact.component';
import {CreateNewRoomComponent} from './components/create-new-room/create-new-room.component';
import {GoPlayRoomsComponent} from './components/go-play-rooms/go-play-rooms.component';
import {UsersRoomsComponent} from './components/users-rooms/users-rooms.component';
import {QuestionSetComponent} from './components/question-set/question-set.component';
import {QuestionSetsComponent} from './components/question-sets/question-sets.component';
import {MsalGuard} from '@azure/msal-angular';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {LoadingPageResolver} from './resolver/loading-page-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/avaleht', pathMatch: 'full'},
  { path: 'avaleht', component: GreetingComponent, resolve: {LoadingPageResolver}},
  { path: 'kkk', component: QuestionsanswersComponent, resolve: {LoadingPageResolver}},
  { path: 'mang', component: RoomComponent, resolve: {LoadingPageResolver}},
  { path: 'mang/:id', component: MapComponent, resolve: {  LoadingPageResolver}},
  { path: 'kontakt', component: ContactComponent, resolve: {  LoadingPageResolver}},
  { path: 'map', component: MapComponent, resolve: {  LoadingPageResolver}},
  { path: 'createmap', component: CreateMapComponent, resolve: {  LoadingPageResolver}},
  { path: 'createlocation', component: LocationSetsComponent, resolve: {  LoadingPageResolver}},
  { path: 'createlocation/:id', component: CreateMapComponent, resolve: {  LoadingPageResolver}},
  { path: 'ruumid', component: UsersRoomsComponent, resolve: {  LoadingPageResolver}},
  { path: 'ruumid/:id', component: CreateNewRoomComponent, resolve: {  LoadingPageResolver}},
//  { path: 'kasutaja', component: UserProfileComponent},
  { path: 'tiimiRegamine', component: GoPlayRoomsComponent, resolve: {  LoadingPageResolver}},
  { path: 'questionsets/:id/:name', component: QuestionSetComponent, resolve: {  LoadingPageResolver}},
  { path: 'questionsets', component: QuestionSetsComponent, resolve: {  LoadingPageResolver}},
  { path: '**', component: NotfoundComponent, resolve: {  LoadingPageResolver}}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

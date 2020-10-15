import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GreetingComponent} from './components/greeting/greeting.component';
import {QuestionsanswersComponent} from './components/questionsanswers/questionsanswers.component';
import {ContactComponent} from './components/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/avaleht', pathMatch: 'full'},
  { path: 'avaleht', component: GreetingComponent},
  { path: 'kkk', component: QuestionsanswersComponent},
//  { path: 'mang', component: RoomComponent},
  { path: 'kontakt', component: ContactComponent},
//  { path: 'uus', component: CreateNewRoomComponent},
//  { path: 'kasutaja', component: UserProfileComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

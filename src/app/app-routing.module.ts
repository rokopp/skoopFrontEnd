import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GreetingComponent} from './components/greeting/greeting.component';
import {QuestionsanswersComponent} from './components/questionsanswers/questionsanswers.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'homepage', component: GreetingComponent},
  { path: 'kkk', component: QuestionsanswersComponent},
//  { path: 'mang', component: RoomComponent},
//  { path: 'kontakt', component: ContactComponent},
//  { path: 'uus', component: CreateNewRoomComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

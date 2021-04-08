import { ShowActivatedRoomComponent } from './components/show-activated-room/show-activated-room.component';
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
import {NotfoundComponent} from './components/notfound/notfound.component';
import {RoomEditingComponent} from './components/room-editing/room-editing.component';
import { ActivateRoomComponent } from './components/activate-room/activate-room.component';

const routes: Routes = [
  { path: '', redirectTo: '/avaleht', pathMatch: 'full'},
  { path: 'avaleht', component: GreetingComponent},
  { path: 'kkk', component: QuestionsanswersComponent, },
  { path: 'mang', component: RoomComponent, },
  { path: 'mang/:joincode', component: GoPlayRoomsComponent,  },
  { path: 'mang/:joincode/:teamname', component: MapComponent },
  { path: 'kontakt', component: ContactComponent,   },
  { path: 'map', component: MapComponent,   },
  { path: 'createmap', component: CreateMapComponent,   },
  { path: 'createlocation', component: LocationSetsComponent,   },
  { path: 'createlocation/:id', component: CreateMapComponent,   },
  { path: 'ruumid', component: UsersRoomsComponent,   },
  // { path: 'ruumid/:id', component: CreateNewRoomComponent,   },
//  { path: 'kasutaja', component: UserProfileComponent},
  { path: 'tiimiRegamine', component: GoPlayRoomsComponent,   },
  // { path: 'questionsets/:id/:name', component: QuestionSetComponent,   },
  // { path: 'questionsets', component: QuestionSetsComponent,   },
  { path: 'roomediting/:id', component: RoomEditingComponent,
    children: [
      {
        path: 'ruumid/:id',
        component: CreateNewRoomComponent
      },
      { path: 'aktiveeri',
        component: ActivateRoomComponent,
      },
      { path: 'aktiveeri/:activeroom',
        component: ShowActivatedRoomComponent,
      },
      {
        path: 'questionsets',
        component: QuestionSetsComponent
      },
      {
        path: 'createlocation',
        component: LocationSetsComponent
      },
      {
        path: 'questionsets/:id/:name',
        component: QuestionSetComponent
      }
    ]},
  { path: '**', component: NotfoundComponent,   }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

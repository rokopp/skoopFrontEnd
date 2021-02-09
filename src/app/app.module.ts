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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { OAuthSettings } from './components/oauth/oauth';
import {CommonModule} from '@angular/common';

import { IPublicClientApplication,
  PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';

// tslint:disable-next-line:max-line-length
import { MsalGuard, MsalInterceptor,
  MsalBroadcastService, MsalInterceptorConfiguration,
  MsalModule, MsalService,
  MSAL_GUARD_CONFIG, MSAL_INSTANCE,
  // @ts-ignore
  MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { ProfileComponent } from './components/profile/profile.component';


const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

// tslint:disable-next-line:typedef
export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: OAuthSettings.appId,
      redirectUri: OAuthSettings.redirectUri,
      authority: OAuthSettings.tenantID,
      postLogoutRedirectUri: '/'
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { interactionType: InteractionType.Redirect };
}

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
    QuestionSetComponent,
    LocationSetsComponent,
    QuestionSetsComponent,
    ProfileComponent,
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
      MsalModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

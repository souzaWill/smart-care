import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Camera } from '@ionic-native/camera'
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';
import { LocalNotifications } from '@ionic-native/local-notifications';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { IndexAuthPage } from '../pages/auth/index-auth/index-auth';
import { CreateAuthPage } from '../pages/auth/create-auth/create-auth';
import { RecoveryAuthPage } from '../pages/auth/recovery-auth/recovery-auth';
import { IndexAlarmePage } from '../pages/alarme/index-alarme/index-alarme';
import { CreateAlarmePage } from '../pages/alarme/create-alarme/create-alarme';
import { EditAlarmePage } from '../pages/alarme/edit-alarme/edit-alarme';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { AlarmesProvider } from '../providers/alarmes/alarmes';
import { ProfileAuthPage } from '../pages/auth/profile-auth/profile-auth';
import { IntroPage } from '../pages/intro/intro';
import { SessionProvider } from '../providers/session/session';
import { RemediosProvider } from '../providers/remedios/remedios';
import { CreateRemedioPage } from '../pages/remedio/create-remedio/create-remedio';
import { IndexRemedioPage } from '../pages/remedio/index-remedio/index-remedio';
import { EditRemedioPage } from '../pages/remedio/edit-remedio/edit-remedio';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IndexAuthPage,
    CreateAuthPage,
    RecoveryAuthPage,
    IndexAlarmePage,
    CreateAlarmePage,
    EditAlarmePage,
    ProfileAuthPage,
    IntroPage,
    CreateRemedioPage,
    IndexRemedioPage,
    EditRemedioPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IndexAuthPage,
    CreateAuthPage,
    RecoveryAuthPage,
    IndexAlarmePage,
    CreateAlarmePage,
    EditAlarmePage,
    ProfileAuthPage,
    IntroPage,
    CreateRemedioPage,
    IndexRemedioPage,
    EditRemedioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    DatabaseProvider,
    SQLite,
    UsuariosProvider,
    AlarmesProvider,
    SessionProvider,
    SMS,
    RemediosProvider,
    LocalNotifications
  ]
})
export class AppModule {}

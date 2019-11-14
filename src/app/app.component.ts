import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';


import { HomePage } from '../pages/home/home';
import { IndexAlarmePage } from '../pages/alarme/index-alarme/index-alarme';
import { ProfileAuthPage } from '../pages/auth/profile-auth/profile-auth';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { IntroPage } from '../pages/intro/intro';
import { IndexAuthPage } from '../pages/auth/index-auth/index-auth';
import { SessionProvider } from '../providers/session/session';
import { Storage } from "@ionic/storage";
import { IndexRemedioPage } from '../pages/remedio/index-remedio/index-remedio';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  exist;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public storage: Storage, public session : SessionProvider, public usuariosProvider : UsuariosProvider ,private dbProvider: DatabaseProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Alarmes', component: IndexAlarmePage },
      { title: 'Remedio', component: IndexRemedioPage },
      { title: 'Perfil', component: ProfileAuthPage },

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
     
       //Criando o banco de dados
       this.dbProvider.createDatabase()
       .then(() => {
         // fechando a SplashScreen somente quando o banco for criado
         this.openHomePage(this.splashScreen);
       })
       .catch((e) => {
         // ou se houver erro na criação do banco
         this.openHomePage(this.splashScreen);
         console.log(e);
       });

      this.statusBar.styleDefault();
      // this.splashScreen.hide();

      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private openHomePage(splashScreen: SplashScreen) {
    this.session.exist().then(data => {

      splashScreen.hide();
    if (this.usuariosProvider.showSlide()) {
      this.rootPage = IntroPage;
    } else if(data){
      this.rootPage = HomePage;
    }
    else{
      this.rootPage = IndexAuthPage;
    }
    });

  }
}

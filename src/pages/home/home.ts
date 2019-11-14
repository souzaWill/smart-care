import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RemediosProvider } from '../../providers/remedios/remedios';
import { SessionProvider } from '../../providers/session/session';
import { AlarmesProvider } from '../../providers/alarmes/alarmes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  remedios: any[] = [];
  alarmes: any[] = [];

  constructor(private alarmesProvider : AlarmesProvider ,public navCtrl: NavController, private remedioProvider : RemediosProvider, private session: SessionProvider) {

  }

  ionViewDidLoad(){
    this.session.get().then((user) => {
      this.remedioProvider.getEnding(user.id).then((data: any[]) => {
        console.log(data);
        this.remedios = data;
      });
    });

    this.session.get().then((user) => {
      this.alarmesProvider.getNextAlarme(user.id).then((data : any[]) => {
        console.log(data);
        this.alarmes = data;
      })
    })

  }

}

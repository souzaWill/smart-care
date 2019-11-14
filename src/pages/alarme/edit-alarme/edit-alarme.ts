import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionProvider } from '../../../providers/session/session';
import { Storage } from "@ionic/storage";
import { Usuario } from '../../../app/models/usuario';

@IonicPage()
@Component({
  selector: 'page-edit-alarme',
  templateUrl: 'edit-alarme.html',
})
export class EditAlarmePage {
  usuarioLogado: Usuario;

  constructor(public session: SessionProvider, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.session.get()
      .then(res => {
        this.usuarioLogado = res;
        console.log(this.usuarioLogado.email);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAlarmePage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionProvider } from '../../../providers/session/session';
import { IndexAuthPage } from '../index-auth/index-auth';
import { UsuariosProvider } from "../../../providers/usuarios/usuarios"
import { Usuario } from '../../../app/models/usuario';


/**
 * Generated class for the ProfileAuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-auth',
  templateUrl: 'profile-auth.html',
})
export class ProfileAuthPage {

  usuarios: any[] = [];;
  usuarioLogado: Usuario;

  constructor(private usuariosProvider : UsuariosProvider, public session : SessionProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.read();

    console.log('ionviewdidload');
    console.log(this.usuarios);

  }

  read() {
    this.session.get()
    .then(res => {
      this.usuarioLogado = res;
            this.usuariosProvider.getByEmail(this.usuarioLogado.email).then((res : any[])=>{
              this.usuarios = res;
            });
      });

  }
  logout(){
    this.session.remove();
    this.navCtrl.setRoot(IndexAuthPage);
  }

}

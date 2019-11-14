import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { CreateAuthPage } from '../create-auth/create-auth';
import { RecoveryAuthPage } from '../recovery-auth/recovery-auth';
import { UsuariosProvider } from '../../../providers/usuarios/usuarios';
import { Usuario } from '../../../app/models/usuario';
import { ToastController } from 'ionic-angular';
import { SessionProvider } from '../../../providers/session/session';
import { HomePage } from '../../home/home';


@IonicPage()
@Component({
  selector: 'page-index-auth',
  templateUrl: 'index-auth.html',
})
export class IndexAuthPage {
  usuario: Usuario;
  public formLogin: any;
  check : boolean = false;

  constructor(public session: SessionProvider, public menuCtrl: MenuController, public toastCtrl: ToastController, private usuarioProvider: UsuariosProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(false, "myMenu");
    this.usuario = new Usuario;
    
  }

  auth(){
    this.usuarioProvider.auth(this.usuario.email, this.usuario.senha)
    .then((data)=>{
      if (data) {
        const toast = this.toastCtrl.create({
          message: 'Logado com sucesso',
          duration: 3000,
          position: 'bottom'
        });

        toast.present();
        this.createSession(this.usuario);
        this.navCtrl.setRoot(HomePage);
      } else {
        const toast = this.toastCtrl.create({
          message: 'usuario ou senha incorretos',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    })
    .catch(() => {

    });
  }

  createSession(usuario : Usuario){
    console.log(usuario);
    this.usuarioProvider.getByEmail(usuario.email).then((data)=>{
      this.session.create(data[0], this.check);
    });
    
    
  }


  goToCreatePage(){
    this.navCtrl.push(CreateAuthPage);
  }
  goToRecoveryPage(){
    this.navCtrl.push(RecoveryAuthPage);
  }

}

import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { CreateAlarmePage } from '../create-alarme/create-alarme';
import { EditAlarmePage } from '../edit-alarme/edit-alarme';
import { SessionProvider } from '../../../providers/session/session';
import { Usuario } from '../../../app/models/usuario';
import { Storage } from "@ionic/storage";
import { AlarmesProvider } from '../../../providers/alarmes/alarmes';
import { LocalNotifications } from '@ionic-native/local-notifications';




@IonicPage()
@Component({
  selector: 'page-index-alarme',
  templateUrl: 'index-alarme.html',
})
export class IndexAlarmePage {
  
  usuarioLogado: Usuario;

  alarmes : any[] = [];

  constructor(private localNotification : LocalNotifications ,public alarmeProvider : AlarmesProvider, public session: SessionProvider, public storage: Storage, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewDidLoad() {
    this.session.get()
    .then(res => {
      this.usuarioLogado = res;
      this.alarmeProvider.getbyUser(this.usuarioLogado.id)
      .then((data) => {
        this.alarmes = data;

      })
      .catch(() => console.error("nao sei") );

    });

  }

  get(){
    return this.session.get()
      .then(res => {
        this.usuarioLogado = res;
        this.alarmeProvider.getbyUser(this.usuarioLogado.id);
      });
  }


  goToCreatePage() {
    this.navCtrl.push(CreateAlarmePage);
  }

  delete(alarme){
    this.localNotification.clearAll();
    this.alarmeProvider.delete(alarme.id);
    var index = this.alarmes.indexOf(alarme);
    this.alarmes.splice(index,1);
    
  }

  goToEditPage() {
    this.navCtrl.push(EditAlarmePage);
  }

}

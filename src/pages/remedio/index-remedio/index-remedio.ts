import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateRemedioPage } from '../create-remedio/create-remedio';
import { EditRemedioPage } from '../edit-remedio/edit-remedio';
import { SessionProvider } from '../../../providers/session/session';
import { RemediosProvider } from '../../../providers/remedios/remedios';
import { Remedio } from '../../../app/models/remedio';


@IonicPage()
@Component({
  selector: 'page-index-remedio',
  templateUrl: 'index-remedio.html',
})
export class IndexRemedioPage {
  remedios: any[] = [];

  constructor(private remedioProvider: RemediosProvider, private session: SessionProvider, public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexRemedioPage');
    this.session.get().then((user) => {
      this.remedioProvider.getByIdUsuario(user.id).then((data: any[]) => {
        console.log(data);
        this.remedios = data;
      });
    });

  }

  gotToCreatePage() {
    this.navCtrl.push(CreateRemedioPage);
  }
  goToEditPage(remedio : Remedio) {
    console.log(remedio)
    this.navCtrl.push(EditRemedioPage,{
      id : remedio.id,
      nome: remedio.nome,
      usuario_id : remedio.usuario_id,
      quantidade : remedio.quantidade,
      tipo : remedio.tipo,
      intervalo : remedio.intervalo,
      imagem : remedio.imagem,
    });

  }
  delete(remedio : Remedio) {
    console.log(remedio.id);
    this.remedioProvider.delete(remedio.id);
    var index = this.remedios.indexOf(remedio);
    this.remedios.splice(index,1);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditRemedioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-remedio',
  templateUrl: 'edit-remedio.html',
})
export class EditRemedioPage {
    id : number;
    nome: string;
    usuario_id : number;
    quantidade : number;
    tipo : string;
    intervalo : number;
    imagem: string;


  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get('id');
    this.nome = this.navParams.get('nome');
    this.usuario_id = this.navParams.get('usuario_id');
    this.quantidade = this.navParams.get('quantidade');
    this.tipo = this.navParams.get('tipo');
    this.intervalo = this.navParams.get('intervalo');
    this.imagem = this.navParams.get('imagem');


  }
  
  ionViewDidLoad() {
    //console.log('ionViewDidLoad EditRemedioPage');
  }
  
  teste(){
   console.log(this.nome);

  }

}

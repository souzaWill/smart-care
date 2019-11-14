import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Remedio } from '../../../app/models/remedio';
import { RemediosProvider } from '../../../providers/remedios/remedios';
import { SessionProvider } from '../../../providers/session/session';
import { IndexRemedioPage } from '../index-remedio/index-remedio';


@IonicPage()
@Component({
  selector: 'page-create-remedio',
  templateUrl: 'create-remedio.html',
})
export class CreateRemedioPage {
  remedio;
  img="assets/imgs/remedio.png";
  usuarioLogado;

  public formCreateRemedio : any;

  constructor(public session: SessionProvider, private remedioProvider : RemediosProvider,formBuilder: FormBuilder, public menuCtrl: MenuController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
    this.remedio = new Remedio();
    this.formCreateRemedio = formBuilder.group({
      nome : ['',  Validators.required],
      quantidade : ['', Validators.required],
      tipo : ['', Validators.required],
      intervalo : ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateRemedioPage');
  }

  store(){
    console.log("store")
    this.session.get()
    .then((user)=>{
    
      this.remedio.imagem = this.img;
      this.remedio.usuario_id = user.id;
      console.log(this.remedio);
      this.remedioProvider.insert(this.remedio)
      this.navCtrl.setRoot(IndexRemedioPage);
      
    
    })
    .catch((e)=> console.error(e));
  }

  validate(){
    let {nome , quantidade, tipo, intervalo} = this.formCreateRemedio.controls;
    if (this.formCreateRemedio.valid) {
      this.store();
      
    } else if(!nome.valid) {
      const toast = this.toastCtrl.create({
        message: 'Nome Invalido',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    } else if(!quantidade.valid) {
      const toast = this.toastCtrl.create({
        message: 'quantidade Invalido',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    } else if(!tipo.valid) {
      const toast = this.toastCtrl.create({
        message: 'tipo Invalido',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    } else if(!intervalo.valid) {
      const toast = this.toastCtrl.create({
        message: 'intervalo Invalido',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    } 
  }

  /**
   * abre a camera e salva a imagem na variavel img
   * caso caia no catch envia o erro ao console
   */
  takePicture(){
    const options : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options)
    .then((imageData)=>{
      console.log(imageData);
      if (this.img = ""){
        this.img = "assets/imgs/remedio.png"
      }else{
       this.img = 'data:image/jpeg;base64,' + imageData;
      }
    })
    .catch((e)=> console.error(e));

  }

  /**
   * apaga a imagem
   */
  deletePicture(){
    this.img="assets/imgs/remedio.png";
  }

}

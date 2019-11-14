import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IndexAuthPage } from '../index-auth/index-auth';
import { UsuariosProvider } from '../../../providers/usuarios/usuarios';
import { Usuario } from '../../../app/models/usuario';
import { ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { regexValidators } from '../../validators/validator';


@IonicPage()
@Component({
  selector: 'page-create-auth',
  templateUrl: 'create-auth.html',
})
export class CreateAuthPage {
  usuario;
  img="assets/imgs/transferir.png";

  public formCreateAuth : any;

  constructor(formBuilder: FormBuilder, public menuCtrl: MenuController, public toastCtrl: ToastController, private usuarioProvider: UsuariosProvider, public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
    this.menuCtrl.enable(false, "myMenu");
    this.usuario = new Usuario;

    this.formCreateAuth = formBuilder.group({
      email : ['',  Validators.compose([
        Validators.pattern(regexValidators.email),
        Validators.required
      ])],
      nome : ['', Validators.required],
      senha : ['', Validators.required],
    });

  }

  validate(){
    let {nome , email, senha} = this.formCreateAuth.controls;
    if (this.formCreateAuth.valid) {
      this.store();
      
    } else if(!nome.valid) {
      const toast = this.toastCtrl.create({
        message: 'Nome Invalido',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    } else if(!email.valid) {
      const toast = this.toastCtrl.create({
        message: 'email Invalido',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    } else if(!senha.valid) {
      const toast = this.toastCtrl.create({
        message: 'senha Invalida',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }


  /**
   * salva o novo usuario no banco e retorna para a tela de login
   */
  store(){
    this.usuario.imagem = this.img;
    this.usuarioProvider.insert(this.usuario)
    .then(()=>{
      const toast = this.toastCtrl.create({
        message: 'Usuario criado com sucesso',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.setRoot(IndexAuthPage);
    })
    .catch((e) => {
      const toast = this.toastCtrl.create({
        message: e,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
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
        this.img = "assets/imgs/transferir.png"
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
    this.img="assets/imgs/transferir.png";
  }


}

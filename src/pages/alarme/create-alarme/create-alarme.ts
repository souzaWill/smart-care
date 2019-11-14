import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionProvider } from '../../../providers/session/session';
import { Alarme } from '../../../app/models/alarme';
import { AlarmesProvider } from '../../../providers/alarmes/alarmes';
import { IndexAlarmePage } from '../index-alarme/index-alarme';
import { RemediosProvider } from '../../../providers/remedios/remedios';

@IonicPage()
@Component({
  selector: 'page-create-alarme',
  templateUrl: 'create-alarme.html',
})
export class CreateAlarmePage {
  notificacao;
  alarme;
  usuarioLogado;
  remedios: any[] = [];

  public formCreateAlarme: any;

  constructor(private remedioProvider : RemediosProvider , private alarmeProvider : AlarmesProvider, private session: SessionProvider , formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.alarme = new Alarme;

    this.formCreateAlarme = formBuilder.group({
      remedio_id: ['', Validators.required],
      usuario_id: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      observacao: ['', Validators.required],
      dosagem: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAlarmePage');

    this.session.get().then((user) => {
      this.remedioProvider.getByIdUsuario(user.id).then((data: any[]) => {
        console.log(data);
        this.remedios = data;
      });
    });

  }

  store(){
    // var date = new Date(this.alarme.data+" "+this.alarme.hora);

    // this.notificacao = {
    //   title: this.alarme.remedio_id,
    //   text: "hora de tomar "+ this.alarme.quantidade+ " " + this.alarme.remedio_id ,
    //   trigger: {at: date},
    //   actions: [
    //     { id: 'yes', title: 'Yes' },
    //     { id: 'no',  title: 'No' }
    //   ],
    //   timeoutAfter : false,
    //   sound: 'file://assets/sound/sound.mp3',
    //   vibrate: true
    // }

    // console.log(this.remedios);

    // this.localNotification.schedule(this.notificacao);

    
    this.session.get().then( (user) => {
      this.alarme.usuario_id = user.id;
      console.log(this.alarme);
      this.alarmeProvider.insert(this.alarme).then((data) => console.log(data));

    }).catch((e) => console.error(e));

    this.navCtrl.setRoot(IndexAlarmePage);
  }


  validate() {
    let { remedio_id, usuario_id, data, hora, dosagem } = this.formCreateAlarme.controls;

    if (this.formCreateAlarme.valid) {

    }
    else if (!remedio_id.valid) {

    }
    else if (!usuario_id.valid) {

    }
    else if (!data.valid) {

    }
    else if (!hora.valid) {

    }
    else if (!dosagem.valid) {

    }

  }





}

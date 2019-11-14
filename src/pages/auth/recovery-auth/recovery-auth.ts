import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';


@IonicPage()
@Component({
  selector: 'page-recovery-auth',
  templateUrl: 'recovery-auth.html',
})
export class RecoveryAuthPage {

  constructor(public sms : SMS, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(false, "myMenu");

  }

  send(){
    this.sms.send('31984390691', 'Hello world!');
  }


}

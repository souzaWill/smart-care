import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecoveryAuthPage } from './recovery-auth';

@NgModule({
  declarations: [
    RecoveryAuthPage,
  ],
  imports: [
    IonicPageModule.forChild(RecoveryAuthPage),
  ],
})
export class RecoveryAuthPageModule {}

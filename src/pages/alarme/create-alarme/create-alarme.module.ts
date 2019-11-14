import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAlarmePage } from './create-alarme';

@NgModule({
  declarations: [
    CreateAlarmePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAlarmePage),
  ],
})
export class CreateAlarmePageModule {}

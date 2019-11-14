import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAlarmePage } from './edit-alarme';

@NgModule({
  declarations: [
    EditAlarmePage,
  ],
  imports: [
    IonicPageModule.forChild(EditAlarmePage),
  ],
})
export class EditAlarmePageModule {}

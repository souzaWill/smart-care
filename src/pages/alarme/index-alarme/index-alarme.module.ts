import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexAlarmePage } from './index-alarme';

@NgModule({
  declarations: [
    IndexAlarmePage,
  ],
  imports: [
    IonicPageModule.forChild(IndexAlarmePage),
  ],
})
export class IndexAlarmePageModule {}

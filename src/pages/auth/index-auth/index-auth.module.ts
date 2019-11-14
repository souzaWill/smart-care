import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexAuthPage } from './index-auth';

@NgModule({
  declarations: [
    IndexAuthPage,
  ],
  imports: [
    IonicPageModule.forChild(IndexAuthPage),
  ],
})
export class IndexAuthPageModule {}

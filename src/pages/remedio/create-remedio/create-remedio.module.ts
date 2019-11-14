import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateRemedioPage } from './create-remedio';

@NgModule({
  declarations: [
    CreateRemedioPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateRemedioPage),
  ],
})
export class CreateRemedioPageModule {}

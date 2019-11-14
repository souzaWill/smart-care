import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileAuthPage } from './profile-auth';

@NgModule({
  declarations: [
    ProfileAuthPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileAuthPage),
  ],
})
export class ProfileAuthPageModule {}

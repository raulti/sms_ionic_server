import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { SMS } from '@ionic-native/sms/ngx';

import { HomePageRoutingModule } from './home-routing.module';
import { HomeService } from './home.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [SMS, HomeService ]
})
export class HomePageModule {}

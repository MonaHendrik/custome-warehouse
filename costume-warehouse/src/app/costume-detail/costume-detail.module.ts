import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CostumeDetailPage } from './costume-detail.page';
import { CostumeDetailPageRoutingModule } from './costume-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostumeDetailPageRoutingModule 
  ],
  declarations: [CostumeDetailPage] 
})
export class CostumeDetailPageModule {}

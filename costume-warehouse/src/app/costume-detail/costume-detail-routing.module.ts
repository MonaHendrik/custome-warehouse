import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostumeDetailPage } from './costume-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CostumeDetailPage 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostumeDetailPageRoutingModule {}

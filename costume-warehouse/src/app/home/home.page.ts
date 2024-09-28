import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CostumeService } from '../services/costume.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage {
showForm = false;
formData = { id: 0 ,name:'', description:'', price:'', size:'', color:'', count:''};
item: any;
costumes: any[] = [];

constructor(private router: Router,private costumeService: CostumeService) {}


ngOnInit() {
  this.loadCostumes();
}

loadCostumes() {
  this.costumeService.getCostumes().subscribe(data=> {
    this.costumes = data;
  });
}

addCostume() {
  this.showForm = !this.showForm;

}

submitForm() {
  console.log(this.formData);
  this.costumeService.addCostume(this.formData);
}

deleteCostume(item:any) {
  this.costumes = this.costumes.filter((costume: any) => costume !== item);
  console.log(this.item);
 }

goToCostumeDetail(costume:any) {
  this.router.navigate(['/costume-detail', costume.id]);
}


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostumeService } from '../services/costume.service';
@Component({
  selector: 'app-costume-detail',
  templateUrl: './costume-detail.page.html',
  styleUrls: ['./costume-detail.page.scss'],
})
export class CostumeDetailPage implements OnInit {
  costume: any = { name: '', description: '', price: '', size: '', color: '', count: '', img: '', lent: '' };
  showForm = false;
  formData = {
    name: '',
    description: '',
    price: '',
    size: '',
    color: '',
    count: 0,
    img: '',
    lent: '',
   };
   costumes: any[] = [];
  constructor(private route: ActivatedRoute, private costumeService: CostumeService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Costume ID:', id);
    if (id) {
      this.costumeService.getCostumeById(id).subscribe(data => {
        this.costume = data;
      }, error => {
        console.error('Error fetching costume:', error);
      });
    }
    this.loadCostumes();
  }
  
  loadCostumes() {
    this.costumeService.getCostumes().subscribe(data => {
      this.costumes = data;
    });
  }
  loadCostumeDetails(id: string) {
    this.costumeService.getCostumeById(id).subscribe((data: any) => {
      this.costume = data; 
      console.log('Costume details:', this.costume);
    }, (error: any) => {
      console.error('Error loading costume details:', error);
    });
  }

  editCostume() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm(); 
    }
    this.formData = { ...this.costume };
  }
  resetForm() {
    this.formData = {name: '', description: '', price: '', size: '', color: '', count: 0 ,img: '', lent: ''}; 
  }

  submitForm() {
    const id = this.route.snapshot.paramMap.get('id');
  
    if (id) {
      this.costumeService.updateCostume(id, this.formData)
        .then(() => {
          this.showForm = false;
        })
        .catch(error => {
          console.error('Update fehlgeschlagen: ', error);
        });
    } else {
      console.error('Keine gültige ID gefunden!'); 
    }
  }
  

  hideForm() {
    this.showForm = false;
    
  }
  takeOrUploadFoto() {

  }
}

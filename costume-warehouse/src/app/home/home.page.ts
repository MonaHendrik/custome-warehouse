import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CostumeService } from '../services/costume.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage {
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

  constructor(private router: Router, private costumeService: CostumeService,private toastCtrl: ToastController) {}

  ngOnInit() {
    this.loadCostumes();
  }

  loadCostumes() {
    this.costumeService.getCostumes().subscribe(data => {
      this.costumes = data;
    });
  }

  addCostume() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm(); 
    }
  }

  resetForm() {
    this.formData = {name: '', description: '', price: '', size: '', color: '', count: 0 ,img: '', lent: ''}; 
  }

  async submitForm() {
    console.log(this.formData);
    
    if (!this.formData.name || !this.formData.size || !this.formData.count) {
      const toast = await this.toastCtrl.create({
        message: 'Bitte gebe Name, Größe und Anzahl ein',
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss().then(() => {
        console.log('Toast dismissed');
      });
      toast.present();
      console.error('Bitte gebe Name, Größe und Anzahl ein');
      return; 
    }
  
    this.costumeService.addCostume(this.formData).then((newCostume) => {
      console.log('Costume added:', newCostume); 
      this.costumes.push(newCostume); 
      this.resetForm(); 
      this.showForm = false; 
    }).catch(error => {
      console.error('Error adding costume:', error);
    });
  }
  

  deleteCostume(costumeId: string) {
    this.costumeService.deleteCostume(costumeId).then(() => {
      console.log('Costume deleted:', costumeId);
      this.loadCostumes();
    }).catch(error => {
      console.error('Error deleting costume:', error);
    });
  }

  goToCostumeDetail(costume: any) {
    this.router.navigate(['/costume-detail', costume.id]);
  }

  hideForm() {
    this.showForm = false;
    
  }

  takeOrUploadFoto() {
    const toast = document.getElementById('dynamicToast') as HTMLIonToastElement;
  
    if (toast) {
      toast.buttons = [
        {
          text: 'Bild hochladen', 
          role: 'upload',
          handler: () => {
            console.log('Bild hochladen clicked');
            
          },
        },
        {
          text: 'Bild aufnehmen', 
          role: 'camera',
          handler: () => {
            console.log('Bild aufnehmen clicked');
          },
        },
      ];
  
      toast.addEventListener('ionToastDidDismiss', (ev) => {
        const { role } = ev.detail;
        console.log(`Dismissed with role: ${role}`);
      });
  
      toast.present();
    }
  }  
}

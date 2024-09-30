import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CostumeService } from '../services/costume.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage {
  @ViewChild('fileUploadInput', { static: false }) fileUploadInput!: ElementRef;
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
    this.resetForm();
    
  }

  takeOrUploadFoto() {
    const toast = document.getElementById('dynamicToast') as HTMLIonToastElement;
    if (toast) {
      toast.buttons = [
        {
          text: 'Bild hochladen', 
          role: 'upload',
          handler: () => {
            this.triggerFileUpload();
          },
        },
        {
          text: 'Bild aufnehmen', 
          role: 'camera',
          handler: () => {
            this.triggerCamera();
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

  triggerFileUpload() {
    if (this.fileUploadInput) {
      this.fileUploadInput.nativeElement.click();
    } else {
      console.error('File upload input not found!');
    }
  }

  triggerCamera() {
    const cameraInput = document.getElementById('cameraInput') as HTMLInputElement;
    cameraInput.click(); 
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formData.img = e.target.result;
        console.log('Image selected:', this.formData.img);
      };
      reader.readAsDataURL(file);
    }
  }

  onCameraCapture(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageSrc = e.target.result;
  
        this.compressImage(imageSrc, (compressedDataUrl) => {
          this.formData.img = compressedDataUrl; 
          console.log('Photo captured and compressed:', this.formData.img);
        });
      };
      reader.readAsDataURL(file);
    }
  }

  compressImage(src: string, callback: (compressedDataUrl: string) => void) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const maxWidth = 100;  // Setze die maximale Breite auf 100px
        const scaleSize = maxWidth / img.width;
        
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;  // Höhe basierend auf dem Seitenverhältnis
        
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); 
        callback(compressedDataUrl);
    };
}


}

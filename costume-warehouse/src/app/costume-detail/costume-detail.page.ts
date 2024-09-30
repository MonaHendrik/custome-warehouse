import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostumeService } from '../services/costume.service';
@Component({
  selector: 'app-costume-detail',
  templateUrl: './costume-detail.page.html',
  styleUrls: ['./costume-detail.page.scss'],
})
export class CostumeDetailPage implements OnInit {
  @ViewChild('fileUploadInput', { static: false }) fileUploadInput!: ElementRef;
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
      
      // Set desired output size (reduce resolution)
      const maxWidth = 800; // Max width or height
      const scaleSize = maxWidth / img.width;
      
      canvas.width = maxWidth;
      canvas.height = img.height * scaleSize;
      
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Convert to base64 with reduced quality
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
      callback(compressedDataUrl);
    };
  }
}

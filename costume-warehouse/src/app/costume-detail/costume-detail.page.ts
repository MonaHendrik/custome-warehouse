import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostumeService } from '../services/costume.service';
@Component({
  selector: 'app-costume-detail',
  templateUrl: './costume-detail.page.html',
  styleUrls: ['./costume-detail.page.scss'],
})
export class CostumeDetailPage implements OnInit {
  costume: any;

  constructor(private route: ActivatedRoute,private costumeService: CostumeService) {}

  ngOnInit() {
    const costumeIdString = this.route.snapshot.paramMap.get('id'); 
    
    if (costumeIdString) {
      const costumeId = +costumeIdString; 
      this.costume = this.costumeService.getCostumeById(costumeId);
    } else {
      console.error('Costume ID is null or undefined');
    }
  }
}

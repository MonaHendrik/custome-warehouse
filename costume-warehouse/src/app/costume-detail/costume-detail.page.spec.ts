import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CostumeDetailPage } from './costume-detail.page';

describe('CostumeDetailPage', () => {
  let component: CostumeDetailPage;
  let fixture: ComponentFixture<CostumeDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CostumeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationMedicalWorkerInfoCardComponent } from './education-medical-worker-info-card.component';

describe('EducationMedicalWorkerInfoCardComponent', () => {
  let component: EducationMedicalWorkerInfoCardComponent;
  let fixture: ComponentFixture<EducationMedicalWorkerInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationMedicalWorkerInfoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationMedicalWorkerInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentificationForeignCitizenInfoCardComponent } from './identification-foreign-citizen-info-card.component';

describe('IdentificationForeignCitizenInfoCardComponent', () => {
  let component: IdentificationForeignCitizenInfoCardComponent;
  let fixture: ComponentFixture<IdentificationForeignCitizenInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentificationForeignCitizenInfoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      IdentificationForeignCitizenInfoCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

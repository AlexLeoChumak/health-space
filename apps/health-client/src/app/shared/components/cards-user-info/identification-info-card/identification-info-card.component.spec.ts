import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentificationInfoCardComponent } from './identification-info-card.component';

describe('IdentificationInfoCardComponent', () => {
  let component: IdentificationInfoCardComponent;
  let fixture: ComponentFixture<IdentificationInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentificationInfoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdentificationInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

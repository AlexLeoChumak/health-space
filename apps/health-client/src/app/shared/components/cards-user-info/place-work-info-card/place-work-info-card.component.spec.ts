import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceWorkInfoCardComponent } from './place-work-info-card.component';

describe('PlaceWorkInfoCardComponent', () => {
  let component: PlaceWorkInfoCardComponent;
  let fixture: ComponentFixture<PlaceWorkInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceWorkInfoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceWorkInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

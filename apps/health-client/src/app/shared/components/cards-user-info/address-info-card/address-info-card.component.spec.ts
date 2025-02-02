import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressInfoCardComponent } from './address-info-card.component';

describe('AddressInfoCardComponent', () => {
  let component: AddressInfoCardComponent;
  let fixture: ComponentFixture<AddressInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressInfoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

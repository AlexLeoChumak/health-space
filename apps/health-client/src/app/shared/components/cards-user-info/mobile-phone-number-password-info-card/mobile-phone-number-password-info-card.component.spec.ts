import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobilePhoneNumberPasswordInfoCardComponent } from './mobile-phone-number-password-info-card.component';

describe('MobilePhoneNumberPasswordInfoCardComponent', () => {
  let component: MobilePhoneNumberPasswordInfoCardComponent;
  let fixture: ComponentFixture<MobilePhoneNumberPasswordInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilePhoneNumberPasswordInfoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      MobilePhoneNumberPasswordInfoCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

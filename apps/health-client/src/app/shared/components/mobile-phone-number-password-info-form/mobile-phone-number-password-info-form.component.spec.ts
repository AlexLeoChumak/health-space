import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobilePhoneNumberPasswordInfoFormComponent } from './mobile-phone-number-password-info-form.component';

describe('MobilePhoneNumberPasswordInfoFormComponent', () => {
  let component: MobilePhoneNumberPasswordInfoFormComponent;
  let fixture: ComponentFixture<MobilePhoneNumberPasswordInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilePhoneNumberPasswordInfoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      MobilePhoneNumberPasswordInfoFormComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

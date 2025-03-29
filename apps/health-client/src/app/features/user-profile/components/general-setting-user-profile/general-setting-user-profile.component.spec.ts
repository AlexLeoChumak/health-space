import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralSettingUserProfileComponent } from './general-setting-user-profile.component';

describe('GeneralSettingUserProfileComponent', () => {
  let component: GeneralSettingUserProfileComponent;
  let fixture: ComponentFixture<GeneralSettingUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralSettingUserProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralSettingUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

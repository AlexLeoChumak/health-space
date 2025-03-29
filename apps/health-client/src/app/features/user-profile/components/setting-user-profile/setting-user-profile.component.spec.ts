import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingUserProfileComponent } from './setting-user-profile.component';

describe('SettingUserProfileComponent', () => {
  let component: SettingUserProfileComponent;
  let fixture: ComponentFixture<SettingUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingUserProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

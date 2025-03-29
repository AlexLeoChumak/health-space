import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveUserProfileComponent } from './remove-user-profile.component';

describe('RemoveUserProfileComponent', () => {
  let component: RemoveUserProfileComponent;
  let fixture: ComponentFixture<RemoveUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveUserProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

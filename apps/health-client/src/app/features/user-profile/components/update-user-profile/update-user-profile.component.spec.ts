import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProfileComponent } from 'src/app/features/user-profile';

describe('EditProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

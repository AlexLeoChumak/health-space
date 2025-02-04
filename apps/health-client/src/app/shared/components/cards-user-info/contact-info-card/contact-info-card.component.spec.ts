import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactInfoCardComponent } from './contact-info-card.component';

describe('ContactInfoCardComponent', () => {
  let component: ContactInfoCardComponent;
  let fixture: ComponentFixture<ContactInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInfoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

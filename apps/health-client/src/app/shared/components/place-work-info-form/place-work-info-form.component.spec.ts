import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlaceWorkInfoFormComponent } from './place-work-info-form.component';

describe('PlaceWorkInfoFormComponent', () => {
  let component: PlaceWorkInfoFormComponent;
  let fixture: ComponentFixture<PlaceWorkInfoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlaceWorkInfoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceWorkInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

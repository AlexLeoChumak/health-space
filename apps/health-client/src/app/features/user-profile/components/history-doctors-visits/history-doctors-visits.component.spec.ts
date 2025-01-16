import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryDoctorsVisitsComponent } from './history-doctors-visits.component';

describe('HistoryDoctorsVisitsComponent', () => {
  let component: HistoryDoctorsVisitsComponent;
  let fixture: ComponentFixture<HistoryDoctorsVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryDoctorsVisitsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryDoctorsVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

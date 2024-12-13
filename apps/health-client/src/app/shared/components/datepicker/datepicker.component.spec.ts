import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';
import { By } from '@angular/platform-browser';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DatepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ion-datetime and ion-datetime-button elements', () => {
    const ionDatetimeButton = fixture.debugElement.query(
      By.css('ion-datetime-button')
    );
    const ionDatetime = fixture.debugElement.query(By.css('ion-datetime'));

    expect(ionDatetimeButton).toBeTruthy();
    expect(ionDatetime).toBeTruthy();
  });

  it('should emit dateChange event on date change', () => {
    spyOn(component.dateChange, 'emit');

    const ionDatetime = fixture.debugElement.query(By.css('ion-datetime'));

    // Симулируем событие изменения даты
    const event = new CustomEvent('ionChange', {
      detail: { value: '2024-09-06' },
    });
    ionDatetime.triggerEventHandler('ionChange', event);

    expect(component.dateChange.emit).toHaveBeenCalledWith('2024-09-06');
  });
});

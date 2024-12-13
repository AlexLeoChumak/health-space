import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ErrorNotificationComponent } from './error-notification.component';

describe('ErrorNotificationComponent', () => {
  let component: ErrorNotificationComponent;
  let fixture: ComponentFixture<ErrorNotificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ErrorNotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the "danger" color to the ion-note', () => {
    const errorElement = fixture.debugElement.query(By.css('ion-note'));
    expect(errorElement.attributes['color']).toBe('danger');
  });

  it('should display error notification sends from parent component', () => {
    const connectError = 'Ошибка соединения';
    fixture.componentRef.setInput('errorNotificationProps', connectError);
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('ion-note'));
    expect(element.nativeElement.textContent.trim()).toContain(connectError);
  });
});

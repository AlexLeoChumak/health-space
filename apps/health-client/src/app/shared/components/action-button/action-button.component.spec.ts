import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActionButtonComponent } from './action-button.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ActionButtonComponent', () => {
  let component: ActionButtonComponent;
  let fixture: ComponentFixture<ActionButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ActionButtonComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct label on the button', () => {
    fixture.componentRef.setInput('configProps', {
      label: 'зарегистрироваться',
      isFormButton: true,
      isDisabled: false,
      routerLink: null,
    });
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('ion-button')
    ).nativeElement;
    expect(button.textContent.trim()).toBe('зарегистрироваться');
  });

  it('should disable the button if isDisabled is true', () => {
    fixture.componentRef.setInput('configProps', {
      label: 'обновить данные',
      isFormButton: true,
      isDisabled: true,
      routerLink: null,
    });
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('ion-button')
    ).nativeElement;
    expect(button.disabled).toBe(true);
  });

  it('should enable the button if isDisabled is false', () => {
    fixture.componentRef.setInput('configProps', {
      label: 'обновить данные',
      isFormButton: true,
      isDisabled: false,
      routerLink: null,
    });
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('ion-button')
    ).nativeElement;
    expect(button.disabled).toBe(false);
  });

  it('should emit action event when clicked and routerLink is null', () => {
    spyOn(component.action, 'emit');

    fixture.componentRef.setInput('configProps', {
      label: 'пациент',
      isFormButton: false,
      isDisabled: false,
      routerLink: null,
    });
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('ion-button')
    ).nativeElement;
    button.click();

    expect(component.action.emit).toHaveBeenCalled();
  });

  it('should navigate when routerLink is provided', () => {
    fixture.componentRef.setInput('configProps', {
      label: 'медработник',
      isFormButton: false,
      isDisabled: false,
      routerLink: '/dashboard',
    });
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('ion-button')
    ).nativeElement;
    expect(button.getAttribute('ng-reflect-router-link')).toBe('/dashboard');
  });
});

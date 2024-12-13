import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])], // Simulating router
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // it('should show header/footer on non-login/registration routes', () => {
  //   spyOn(router.events, 'pipe').and.returnValue(
  //     of(new NavigationEnd(0, '/home', '/home'))
  //   );

  //   component.ngOnInit();

  //   expect(component.showHeaderFooter()).toBeTrue();
  // });

  it('should hide header/footer on login route', () => {
    spyOn(router.events, 'pipe').and.returnValue(
      of(new NavigationEnd(0, '/login', '/login'))
    );

    component.ngOnInit();

    expect(component.showHeaderFooter()).toBeFalsy();
  });

  it('should hide header/footer on registration route', () => {
    spyOn(router.events, 'pipe').and.returnValue(
      of(new NavigationEnd(0, '/registration', '/registration'))
    );

    component.ngOnInit();

    expect(component.showHeaderFooter()).toBeFalsy();
  });

  it('should unsubscribe from router events on destroy', () => {
    const subscription = new Subscription();
    component['routerSubscription'] = subscription;
    spyOn(subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(subscription.unsubscribe).toHaveBeenCalled();
  });
});

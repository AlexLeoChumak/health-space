import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonCol,
  IonGrid,
  IonRow,
  IonLabel,
  IonCheckbox,
  IonButtons,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { LoginRequestInterface } from 'src/app/shared/models/login-request.interface';
import { ActionButtonComponent } from 'src/app/shared/components/action-button/action-button.component';
import { selectUser } from 'src/app/store/user';
import { MobilePhoneNumberPasswordInfoFormComponent } from 'src/app/shared/components/mobile-phone-number-password-info-form/mobile-phone-number-password-info-form.component';
import { AppState, login } from 'src/app/store/app';

@Component({
  selector: 'health-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonButtons,
    RouterModule,
    IonCheckbox,
    IonLabel,
    IonCol,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCol,
    IonRow,
    IonGrid,
    IonItem,
    ActionButtonComponent,
    MobilePhoneNumberPasswordInfoFormComponent,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly store = inject(Store<AppState>);
  public loginForm!: FormGroup;
  protected readonly isDoctor = signal<boolean>(false);
  private userSubscription!: Subscription;

  public ngOnInit(): void {
    this.initializeForm();
    this.subscribeToUserState();
  }

  private initializeForm(): void {
    this.loginForm = new FormGroup({});
  }

  protected onSubmitForm(): void {
    if (this.loginForm.invalid) return;

    const loginData: LoginRequestInterface = this.loginForm.value;

    this.store.dispatch(login({ loginData, isDoctor: this.isDoctor() }));
  }

  protected addFormGroup(formGroup: FormGroup): void {
    // Проходим по всем контролям в дочерней форме и добавляем их в родительскую
    Object.keys(formGroup.controls).forEach((controlName) => {
      const control = formGroup.get(controlName);
      if (control) {
        this.loginForm.addControl(controlName, control);
      }
    });
  }

  protected onCheckboxChange(): void {
    this.isDoctor.update((prevValue) => !prevValue);
  }

  private subscribeToUserState(): void {
    this.userSubscription = this.store.select(selectUser).subscribe((user) => {
      if (user) {
        this.router.navigate(['/user-profile']);
        console.log('Логин успешен:', user);
        // запись в localStorage, редирект, очистка формы
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

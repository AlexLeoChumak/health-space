import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonList,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';

import { LoginRequestInterface } from 'src/app/shared/models/login-request.interface';
import { ActionButtonComponent } from 'src/app/shared/components/action-button/action-button.component';
import { MobilePhoneNumberPasswordInfoFormComponent } from 'src/app/shared/components/forms-user-info/mobile-phone-number-password-info-form/mobile-phone-number-password-info-form.component';
import {
  AppState,
  login,
  selectIsAuthenticated,
  selectIsLoading,
} from 'src/app/store/app';

@Component({
  selector: 'health-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCardContent,
    IonCard,
    IonList,
    RouterModule,
    IonCheckbox,
    IonLabel,
    ReactiveFormsModule,
    IonContent,
    IonItem,
    ActionButtonComponent,
    MobilePhoneNumberPasswordInfoFormComponent,
  ],
})
export class LoginComponent implements OnInit {
  private readonly store = inject(Store<AppState>);
  private readonly destroyRef = inject(DestroyRef);
  public loginForm!: FormGroup;
  protected readonly isDoctor = signal<boolean>(false);
  protected readonly isSubmittingForm =
    this.store.selectSignal(selectIsLoading);

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = new FormGroup({});
  }

  protected onSubmitForm(): void {
    if (this.loginForm.invalid) return;

    const loginData: LoginRequestInterface = this.loginForm.value;

    this.store.dispatch(login({ loginData, isDoctor: this.isDoctor() }));

    this.store
      .select(selectIsAuthenticated)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (success) => {
          if (success) {
            this.loginForm.reset({
              mobilePhoneNumber: '+375',
            });
          }
        },
      });
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
}

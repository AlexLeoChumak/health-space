import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
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

import {
  ActionButtonComponent,
  MobilePhoneNumberPasswordInfoFormComponent,
} from 'src/app/shared/components';
import { LoginRequestInterface } from 'src/app/shared/models';
import {
  AppState,
  selectIsLoading,
  login,
  selectIsAuthenticated,
  selectError,
} from 'src/app/store/app';
import { ToastService } from 'src/app/shared/services';

@Component({
    selector: 'health-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
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
    ]
})
export class LoginComponent implements OnInit {
  private readonly store = inject(Store<AppState>);
  private readonly toastService = inject(ToastService);
  public loginForm!: FormGroup;
  protected readonly isDoctor = signal<boolean>(false);
  protected readonly isSubmittingForm =
    this.store.selectSignal(selectIsLoading);
  protected readonly loginError = this.store.selectSignal(selectError);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.registerEffects();
  }

  private registerEffects(): void {
    effect(() => {
      const error = this.loginError();

      if (error) {
        this.toastService.presentToast(error);
      }
    });
  }

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
    // Прохожу по всем контролам в дочерней форме и добавляю их в родительскую
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

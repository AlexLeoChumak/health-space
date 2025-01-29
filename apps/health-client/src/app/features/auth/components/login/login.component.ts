import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class LoginComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly store = inject(Store<AppState>);
  private readonly destroyRef = inject(DestroyRef);
  public loginForm!: FormGroup;
  protected readonly isDoctor = signal<boolean>(false);

  public ngOnInit(): void {
    this.initializeForm();
    this.subscribeToUserState();
  }

  private initializeForm(): void {
    this.loginForm = new FormGroup({});
  }

  private subscribeToUserState(): void {
    this.store
      .select(selectUser)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        if (user) {
          this.router.navigate(['/user-profile']);
        }
      });
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
}

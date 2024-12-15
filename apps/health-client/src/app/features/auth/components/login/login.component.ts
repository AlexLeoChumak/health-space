import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { LoginRequestInterface } from 'src/app/features/auth/models/login-request.interface';
import { AuthService } from 'src/app/features/auth/services/auth.service';

import { ActionButtonComponent } from 'src/app/shared/components/action-button/action-button.component';
import { MobilePhoneNumberPasswordInfoFormComponent } from 'src/app/shared/components/mobile-phone-number-password-info-form/mobile-phone-number-password-info-form.component';
import { DoctorLoginResponseInterface } from 'src/app/shared/models/doctor/doctor-login-response.interface';
import { GlobalApiResponseInterface } from 'src/app/shared/models/global-api-response.interface';
import { PatientLoginResponseInterface } from 'src/app/shared/models/patient/patient-login-response.interface';

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
  private readonly authService = inject(AuthService);
  public loginForm!: FormGroup;
  private readonly isDoctor = signal<boolean>(false);

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = new FormGroup({});
  }

  protected onSubmitForm(): void {
    if (this.loginForm.invalid) return;

    const loginData: LoginRequestInterface = this.loginForm.value;

    this.authService
      .login(loginData, this.isDoctor())
      .subscribe(
        (
          userData: GlobalApiResponseInterface<
            PatientLoginResponseInterface | DoctorLoginResponseInterface
          >
        ) => console.log('юзер из логина', userData)
      );
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

  protected onCheckboxChange(event: CustomEvent): void {
    this.isDoctor.set(event.detail.checked);
  }
}

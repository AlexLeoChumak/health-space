import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';

export type LabelButtonType =
  | 'войти'
  | 'зарегистрироваться'
  | 'обновить данные'
  | 'пациент'
  | 'медработник'
  | 'выбрать фото'
  | 'выбрать другое фото'
  | 'показать календарь'
  | 'скрыть календарь'
  | 'главная'
  | 'личный кабинет'
  | 'выйти'
  | 'редактировать'
  | 'изменить пароль'
  | 'сохранить'
  | 'удалить профиль';

interface ActionButtonConfigInterface {
  label: LabelButtonType;
  isFormButton: boolean;
  isDisabled: boolean;
  routerLink: string | null;
}

@Component({
    selector: 'health-action-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterModule, IonButton]
})
export class ActionButtonComponent {
  public readonly configProps = input<ActionButtonConfigInterface>({
    label: 'войти',
    isFormButton: true,
    isDisabled: true,
    routerLink: null,
  });

  protected readonly action = output<void>();

  protected handleClick(): void {
    if (this.configProps().routerLink === null) {
      this.action.emit();
    }
  }
}

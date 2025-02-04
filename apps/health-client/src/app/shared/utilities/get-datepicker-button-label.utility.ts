import { LabelButtonType } from 'src/app/shared/components/action-button/action-button.component';

export function getDatepickerButtonLabelUtility(
  isDatepickerOpen: boolean
): LabelButtonType {
  return `${isDatepickerOpen ? 'скрыть' : 'показать'} календарь`;
}

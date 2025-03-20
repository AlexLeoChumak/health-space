import { LabelButtonType } from 'src/app/shared/components/action-button/action-button.component';

export const getDatepickerButtonLabelUtil = (
  isDatepickerOpen: boolean
): LabelButtonType => {
  return `${isDatepickerOpen ? 'скрыть' : 'показать'} календарь`;
};

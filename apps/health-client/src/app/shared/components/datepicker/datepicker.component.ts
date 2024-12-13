import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonDatetime } from '@ionic/angular/standalone';

@Component({
  selector: 'health-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonDatetime, FormsModule],
})
export class DatepickerComponent {
  dateChange = output<string>();

  onDateChange(event: CustomEvent): void {
    const selectedDate: string = event.detail.value;
    this.dateChange.emit(selectedDate);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';

@Component({
  selector: 'health-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonItem, IonList, IonPopover, IonIcon, IonButton, CommonModule],
})
export class BurgerMenuComponent {
  isPopoverOpen = false;
  popoverEvent: any;

  openPopover(event: Event) {
    this.popoverEvent = event;
    this.isPopoverOpen = true;
  }

  closePopover() {
    this.isPopoverOpen = false;
  }
}

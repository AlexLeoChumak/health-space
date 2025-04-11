import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonToolbar, IonTitle, IonFooter } from '@ionic/angular/standalone';

@Component({
    selector: 'health-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonFooter, IonToolbar, IonTitle]
})
export class FooterComponent {}

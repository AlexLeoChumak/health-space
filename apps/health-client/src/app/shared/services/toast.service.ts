import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastController: ToastController = inject(ToastController);

  async presentToast(message: string, duration = 5000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration, // Продолжительность в миллисекундах
      position: 'top', // Позиция: 'top', 'middle', 'bottom'
      color: 'primary', // Цвет уведомления (опционально)
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }
}

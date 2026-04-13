import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-pas-inicio',
    template: `
    <ion-content style="--background: #F8FAFC;">
      <div style="padding: 40px; max-width: 1000px; margin: 0 auto;">
        <h1 style="color: #061121; font-weight: 900; font-size: 2rem;">Hola, Productor 👋</h1>
        <p style="color: #64748B;">Acá va a ir tu panel con los tickets y las pólizas.</p>
      </div>
    </ion-content>
  `,
    standalone: true,
    imports: [CommonModule, IonicModule]
})
export class InicioPage { }
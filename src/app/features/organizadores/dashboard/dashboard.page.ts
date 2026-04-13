import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-org-dashboard',
    template: `
    <ion-content style="--background: #F8FAFC;">
      <div style="padding: 40px; max-width: 1000px; margin: 0 auto;">
        <h1 style="color: #061121; font-weight: 900; font-size: 2rem;">Mi Red Comercial</h1>
        <p style="color: #64748B;">Acá van a ir las estadísticas de tus PAS.</p>
      </div>
    </ion-content>
  `,
    standalone: true,
    imports: [CommonModule, IonicModule]
})
export class DashboardPage { }
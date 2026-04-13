import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  documentTextOutline,
  warningOutline,
  alertCircleOutline,
  statsChartOutline,
  personAdd,
  business,
  shieldCheckmark
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DashboardPage implements OnInit {
  indicadores = [
    { titulo: 'Pendientes Emisión', valor: '14', cambio: '+2', trend: 'up', icono: 'document-text-outline', color: 'blue' },
    { titulo: 'Siniestros Críticos', valor: '3', cambio: '-1', trend: 'down', icono: 'warning-outline', color: 'red' },
    { titulo: 'Tickets Abiertos', valor: '28', cambio: '+5', trend: 'up', icono: 'alert-circle-outline', color: 'purple' },
    { titulo: 'Productores Offline', valor: '2', cambio: '0', trend: 'neutral', icono: 'bar-chart-outline', color: 'orange' }
  ];

  prioridades = signal([
    { id: 1, nivel: 'Alta', asunto: 'Error liquidación Sucursal Necochea', origen: 'Administración', tiempo: '2hs', clase: 'high' },
    { id: 2, nivel: 'Media', asunto: 'Pendiente validación DNI - Productor #405', origen: 'Comercial', tiempo: '5hs', clase: 'medium' },
    { id: 3, nivel: 'Alta', asunto: 'Siniestro #9928 sin asignar ejecutivo', origen: 'Siniestros', tiempo: '10 min', clase: 'high' }
  ]);

  constructor() {
    addIcons({
      documentTextOutline,
      warningOutline,
      alertCircleOutline,
      statsChartOutline,
      personAdd,
      business,
      shieldCheckmark
    });
  }

  ngOnInit() {
  }
}
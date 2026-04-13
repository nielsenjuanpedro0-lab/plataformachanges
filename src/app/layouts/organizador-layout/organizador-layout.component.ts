import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { pieChartOutline, peopleOutline, ticketOutline, logOutOutline } from 'ionicons/icons';

@Component({
    selector: 'app-organizador-layout',
    templateUrl: './organizador-layout.component.html',
    styleUrls: ['./organizador-layout.component.scss'],
    standalone: true,
    imports: [IonicModule, RouterModule]
})
export class OrganizadorLayoutComponent {
    constructor() {
        addIcons({ pieChartOutline, peopleOutline, ticketOutline, logOutOutline });
    }
}
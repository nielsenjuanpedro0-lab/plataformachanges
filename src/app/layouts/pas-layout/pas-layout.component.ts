import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { homeOutline, chatbubblesOutline, calculatorOutline } from 'ionicons/icons';

@Component({
    selector: 'app-pas-layout',
    templateUrl: './pas-layout.component.html',
    styleUrls: ['./pas-layout.component.scss'],
    standalone: true,
    imports: [IonicModule, RouterModule]
})
export class PasLayoutComponent {
    constructor() {
        addIcons({ homeOutline, chatbubblesOutline, calculatorOutline });
    }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-ejecutivo-layout',
    templateUrl: './ejecutivo-layout.component.html',
    standalone: true,
    imports: [
        CommonModule,
        IonicModule,
        RouterLink,
        RouterLinkActive
    ]
})
export class EjecutivoLayoutComponent { }
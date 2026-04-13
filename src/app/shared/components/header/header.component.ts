import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-header',
    standalone: true, // <--- CRÍTICO
    imports: [CommonModule, IonicModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent { // <--- REVISÁ QUE DIGA "export class"
    @Input() title: string = '';
    @Input() subtitle: string = '';
}
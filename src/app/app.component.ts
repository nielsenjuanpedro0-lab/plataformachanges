import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  businessOutline,
  peopleOutline,
  personCircleOutline,
  logOutOutline,
  pieChartOutline,
  briefcaseOutline
} from 'ionicons/icons';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, RouterLinkActive],
})
export class AppComponent implements OnInit {
  public authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    addIcons({
      businessOutline,
      peopleOutline,
      personCircleOutline,
      logOutOutline,
      pieChartOutline,
      briefcaseOutline
    });
  }

  async ngOnInit() {
    console.log('AppComponent initialized');
    const token = this.authService.getTokenSync();
    
    if (token) {
      console.log('Token found, loading context...');
      try {
        await this.authService.loadContext().toPromise();
        console.log('Context loaded successfully');
      } catch (error) {
        console.error('Failed to load context, redirecting to login', error);
        if (!this.router.url.includes('/login')) {
          this.router.navigate(['/login'], { replaceUrl: true });
        }
      }
    } else {
      console.log('No token found');
      if (!this.router.url.includes('/login')) {
        console.log('Redirecting to login from', this.router.url);
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PWAService {
  private promptEvent: any;
  private isInstallable$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initializePWA();
  }

  get isInstallable() {
    return this.isInstallable$.asObservable();
  }

  private initializePWA(): void {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.promptEvent = event;
      this.isInstallable$.next(true);
    });

    window.addEventListener('appinstalled', () => {
      this.isInstallable$.next(false);
      this.promptEvent = null;
    });
  }

  async installPWA(): Promise<boolean> {
    if (!this.promptEvent) {
      return false;
    }

    try {
      this.promptEvent.prompt();
      const result = await this.promptEvent.userChoice;
      
      if (result.outcome === 'accepted') {
        this.isInstallable$.next(false);
        this.promptEvent = null;
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error installing PWA:', error);
      return false;
    }
  }

  isStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  }
}

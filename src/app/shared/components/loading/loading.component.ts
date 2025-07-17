import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  loadingText = 'Loading';
  loadingDots = '';
  currentTip = 0;
  
  loadingTips = [
    'Connecting you to top educational institutions...',
    'Preparing your personalized college recommendations...',
    'Loading premium educational consultancy services...',
    'Gathering the latest admission information...',
    'Setting up your pathway to success...',
    'Wayzon - Your trusted educational partner since 2003'
  ];

  private textInterval: any;
  private tipInterval: any;

  ngOnInit(): void {
    this.startLoadingAnimation();
    this.startTipRotation();
  }

  ngOnDestroy(): void {
    if (this.textInterval) {
      clearInterval(this.textInterval);
    }
    if (this.tipInterval) {
      clearInterval(this.tipInterval);
    }
  }

  private startLoadingAnimation(): void {
    let dotCount = 0;
    this.textInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      this.loadingDots = '.'.repeat(dotCount);
    }, 500);
  }

  private startTipRotation(): void {
    this.tipInterval = setInterval(() => {
      this.currentTip = (this.currentTip + 1) % this.loadingTips.length;
    }, 3000);
  }

  getCurrentTip(): string {
    return this.loadingTips[this.currentTip];
  }
}

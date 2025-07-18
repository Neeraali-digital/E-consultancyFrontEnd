import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  
  isVisible = false;
  private scrollThreshold = 300; // Show button after scrolling 300px

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.checkScrollPosition();
  }

  ngOnDestroy(): void {
    // Component cleanup if needed
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScrollPosition();
  }

  private checkScrollPosition(): void {
    this.isVisible = this.scrollService.hasScrolledPast(this.scrollThreshold);
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}

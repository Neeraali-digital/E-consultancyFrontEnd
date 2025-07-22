import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { interval, Subscription } from 'rxjs';

Chart.register(...registerables);

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  gradient?: boolean;
}

@Component({
  selector: 'app-advanced-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full h-full">
      <!-- Chart Container -->
      <div class="relative w-full h-full">
        <canvas #chartCanvas class="w-full h-full"></canvas>
        
        <!-- Loading Overlay -->
        <div *ngIf="isLoading" 
             class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-gray-600 font-medium">Loading chart data...</span>
          </div>
        </div>
      </div>
      
      <!-- Chart Stats -->
      <div *ngIf="showStats" class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div class="text-xs text-gray-500 mb-1">Total</div>
        <div class="text-lg font-bold text-gray-900">{{ getTotalValue() | number }}</div>
        <div class="text-xs" [class.text-green-600]="getGrowthRate() > 0" [class.text-red-600]="getGrowthRate() < 0">
          {{ getGrowthRate() > 0 ? '+' : '' }}{{ getGrowthRate() }}%
        </div>
      </div>
      
      <!-- Real-time Indicator -->
      <div *ngIf="realTime" class="absolute top-4 left-4 flex items-center space-x-2">
        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span class="text-xs text-gray-600 font-medium">Live</span>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class AdvancedChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  @Input() type: ChartType = 'line';
  @Input() data: ChartDataPoint[] = [];
  @Input() title = '';
  @Input() realTime = false;
  @Input() showStats = true;
  @Input() animated = true;
  @Input() gradient = true;
  @Input() theme: 'light' | 'dark' = 'light';
  
  private chart!: Chart;
  private subscription = new Subscription();
  isLoading = true;
  
  private previousData: number[] = [];
  
  ngOnInit(): void {
    if (this.realTime) {
      this.startRealTimeUpdates();
    }
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initChart();
      this.isLoading = false;
    }, 500);
  }
  
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.subscription.unsubscribe();
  }
  
  private initChart(): void {
    const ctx = this.canvasRef.nativeElement.getContext('2d')!;
    
    const config: ChartConfiguration = {
      type: this.type,
      data: this.getChartData(),
      options: this.getChartOptions()
    };
    
    this.chart = new Chart(ctx, config);
    this.previousData = this.data.map(d => d.value);
  }
  
  private getChartData(): ChartData {
    const labels = this.data.map(d => d.label);
    const values = this.data.map(d => d.value);
    
    let backgroundColor: any;
    let borderColor: any;
    
    if (this.gradient && this.type === 'line') {
      const canvas = this.canvasRef.nativeElement;
      const ctx = canvas.getContext('2d')!;
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
      backgroundColor = gradient;
      borderColor = 'rgb(59, 130, 246)';
    } else {
      backgroundColor = this.data.map(d => d.color || 'rgba(59, 130, 246, 0.6)');
      borderColor = this.data.map(d => d.color || 'rgb(59, 130, 246)');
    }
    
    return {
      labels,
      datasets: [{
        label: this.title,
        data: values,
        backgroundColor,
        borderColor,
        borderWidth: 2,
        fill: this.type === 'line',
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }]
    };
  }
  
  private getChartOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: this.animated ? {
        duration: 1000,
        easing: 'easeInOutQuart',
        onComplete: () => {
          if (this.realTime) {
            this.addSparkleEffect();
          }
        }
      } : false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(59, 130, 246, 0.5)',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: (context: any) => {
              return `${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: this.type !== 'doughnut' && this.type !== 'pie' ? {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: this.theme === 'dark' ? '#9ca3af' : '#6b7280'
          }
        },
        y: {
          grid: {
            color: this.theme === 'dark' ? 'rgba(156, 163, 175, 0.1)' : 'rgba(107, 114, 128, 0.1)'
          },
          ticks: {
            color: this.theme === 'dark' ? '#9ca3af' : '#6b7280',
            callback: function(value: any) {
              return value.toLocaleString();
            }
          }
        }
      } : {},
      interaction: {
        intersect: false,
        mode: 'index'
      },
      elements: {
        point: {
          hoverBackgroundColor: 'rgb(59, 130, 246)',
          hoverBorderColor: '#fff',
          hoverBorderWidth: 3
        }
      }
    };
  }
  
  private startRealTimeUpdates(): void {
    this.subscription.add(
      interval(3000).subscribe(() => {
        this.updateChartData();
      })
    );
  }
  
  private updateChartData(): void {
    if (!this.chart) return;
    
    // Simulate real-time data updates
    const newData = this.data.map(d => ({
      ...d,
      value: d.value + (Math.random() - 0.5) * 20
    }));
    
    this.data = newData;
    this.chart.data = this.getChartData();
    this.chart.update('active');
    
    this.previousData = newData.map(d => d.value);
  }
  
  private addSparkleEffect(): void {
    // Add sparkle particles for dramatic effect
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping pointer-events-none';
      sparkle.style.left = Math.random() * rect.width + 'px';
      sparkle.style.top = Math.random() * rect.height + 'px';
      
      canvas.parentElement?.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }
  }
  
  getTotalValue(): number {
    return this.data.reduce((sum, d) => sum + d.value, 0);
  }
  
  getGrowthRate(): number {
    if (this.previousData.length === 0) return 0;
    
    const currentTotal = this.getTotalValue();
    const previousTotal = this.previousData.reduce((sum, val) => sum + val, 0);
    
    if (previousTotal === 0) return 0;
    
    return Math.round(((currentTotal - previousTotal) / previousTotal) * 100);
  }
}

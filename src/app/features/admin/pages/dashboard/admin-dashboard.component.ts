import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { AdminService, DashboardStats } from '../../services/admin.service';
import { Subscription, interval } from 'rxjs';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';


// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(100px)', opacity: 0 }),
        animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('staggerCards', [
      transition(':enter', [
        query('.stat-card', [
          style({ transform: 'translateY(50px)', opacity: 0 }),
          stagger(100, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeInScale', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class AdminDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  stats: DashboardStats | null = null;
  isLoading = true;
  isInitialized = false;
  isRefreshing = false;
  currentTime = new Date();
  lastUpdated = new Date();

  // Dashboard theme colors
  themeColors = {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  };

  // Real-time data simulation
  realTimeData = {
    activeUsers: 0,
    todayInquiries: 0,
    systemLoad: 0,
    responseTime: 0
  };

  private subscription = new Subscription();

  // Chart configurations
  userGrowthChart: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'User Growth Trend'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    }
  };

  collegeDistributionChart: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        },
        title: {
          display: true,
          text: 'College Distribution by Category'
        }
      }
    }
  };

  inquiryTrendsChart: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Weekly Inquiry Trends'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    }
  };

  // Quick actions
  quickActions = [
    {
      title: 'Add New College',
      description: 'Register a new educational institution',
      icon: 'account_balance',
      route: '/admin/colleges/add',
      color: 'blue'
    },
    {
      title: 'Add New Course',
      description: 'Create a new course offering',
      icon: 'school',
      route: '/admin/courses/add',
      color: 'green'
    },
    {
      title: 'Write Blog Post',
      description: 'Share educational insights',
      icon: 'article',
      route: '/admin/blogs/add',
      color: 'purple'
    },
    {
      title: 'View Inquiries',
      description: 'Check student inquiries',
      icon: 'contact_support',
      route: '/admin/inquiries',
      color: 'orange'
    }
  ];

  // Recent activities (mock data)
  recentActivities = [
    {
      id: 1,
      type: 'college',
      title: 'New college added: IIT Bombay',
      time: '2 hours ago',
      icon: 'account_balance',
      color: 'blue'
    },
    {
      id: 2,
      type: 'user',
      title: '15 new user registrations',
      time: '4 hours ago',
      icon: 'people',
      color: 'green'
    },
    {
      id: 3,
      type: 'inquiry',
      title: '8 new inquiries received',
      time: '6 hours ago',
      icon: 'contact_support',
      color: 'orange'
    },
    {
      id: 4,
      type: 'blog',
      title: 'Blog post published: Engineering Trends 2024',
      time: '1 day ago',
      icon: 'article',
      color: 'purple'
    }
  ];

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Instant initialization
    this.isInitialized = true;
    this.initializeCharts();
    this.loadDashboardData();
    this.startRealTimeUpdates();
    this.startTimeUpdates();
  }

  ngAfterViewInit(): void {
    // Already initialized
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeCharts(): void {
    // Initialize charts with empty datasets to prevent loading issues
    this.userGrowthChart.data = {
      labels: [],
      datasets: []
    };

    this.collegeDistributionChart.data = {
      labels: [],
      datasets: []
    };

    this.inquiryTrendsChart.data = {
      labels: [],
      datasets: []
    };
  }

  private loadDashboardData(): void {
    this.isLoading = true;

    // Load dashboard stats with fallback data
    this.subscription.add(
      this.adminService.getDashboardStats().subscribe({
        next: (stats) => {
          this.stats = stats;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading dashboard stats:', error);
          // Provide fallback stats data
          this.stats = {
            totalColleges: 150,
            totalCourses: 85,
            totalUsers: 2500,
            totalInquiries: 45,
            monthlyGrowth: {
              colleges: 12,
              courses: 8,
              users: 180,
              inquiries: 15
            }
          };
          this.isLoading = false;
        }
      })
    );

    // Load chart data with fallback
    this.subscription.add(
      this.adminService.getChartData().subscribe({
        next: (chartData) => {
          this.updateCharts(chartData);
        },
        error: (error) => {
          console.error('Error loading chart data:', error);
          // Provide fallback chart data
          this.loadFallbackChartData();
        }
      })
    );
  }

  private updateCharts(chartData: any): void {
    // Update user growth chart
    if (chartData.userGrowth) {
      this.userGrowthChart.data = chartData.userGrowth;
    }

    // Update college distribution chart
    if (chartData.collegeDistribution) {
      this.collegeDistributionChart.data = chartData.collegeDistribution;
    }

    // Update inquiry trends chart
    if (chartData.inquiryTrends) {
      this.inquiryTrendsChart.data = chartData.inquiryTrends;
    }
  }

  private loadFallbackChartData(): void {
    // Fallback user growth data
    this.userGrowthChart.data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Users',
        data: [120, 190, 300, 500, 200, 300],
        borderColor: this.themeColors.primary,
        backgroundColor: this.themeColors.primary + '20',
        tension: 0.4,
        fill: true
      }]
    };

    // Fallback college distribution data
    this.collegeDistributionChart.data = {
      labels: ['Engineering', 'Medical', 'Management', 'Arts', 'Science'],
      datasets: [{
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          this.themeColors.primary,
          this.themeColors.secondary,
          this.themeColors.success,
          this.themeColors.warning,
          this.themeColors.info
        ]
      }]
    };

    // Fallback inquiry trends data
    this.inquiryTrendsChart.data = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Inquiries',
        data: [65, 59, 80, 81],
        backgroundColor: this.themeColors.success,
        borderColor: this.themeColors.success,
        borderWidth: 2
      }]
    };
  }

  refreshData(): void {
    this.isRefreshing = true;
    this.loadDashboardData();
    setTimeout(() => {
      this.isRefreshing = false;
      this.lastUpdated = new Date();
    }, 1000);
  }

  private startRealTimeUpdates(): void {
    // Simulate real-time data updates every 5 seconds
    this.subscription.add(
      interval(5000).subscribe(() => {
        this.updateRealTimeData();
      })
    );
  }

  private startTimeUpdates(): void {
    // Update current time every second
    this.subscription.add(
      interval(1000).subscribe(() => {
        this.currentTime = new Date();
      })
    );
  }

  private updateRealTimeData(): void {
    // Simulate real-time data changes
    this.realTimeData = {
      activeUsers: Math.floor(Math.random() * 50) + 20,
      todayInquiries: Math.floor(Math.random() * 15) + 5,
      systemLoad: Math.floor(Math.random() * 30) + 40,
      responseTime: Math.floor(Math.random() * 100) + 50
    };
  }

  getGrowthPercentage(current: number, growth: number): number {
    if (current === 0) return 0;
    return Math.round((growth / (current - growth)) * 100);
  }

  getGrowthIcon(growth: number): string {
    return growth > 0 ? 'trending_up' : growth < 0 ? 'trending_down' : 'trending_flat';
  }

  getGrowthColor(growth: number): string {
    return growth > 0 ? 'text-green-600' : growth < 0 ? 'text-red-600' : 'text-gray-600';
  }
}

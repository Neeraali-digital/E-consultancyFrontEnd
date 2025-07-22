import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

@Component({
  selector: 'app-particle-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas 
      #particleCanvas
      class="fixed inset-0 pointer-events-none z-0"
      [width]="canvasWidth"
      [height]="canvasHeight">
    </canvas>
  `,
  styles: [`
    canvas {
      background: transparent;
    }
  `]
})
export class ParticleBackgroundComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId!: number;
  private mouseX = 0;
  private mouseY = 0;
  
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  
  private readonly particleCount = 50;
  private readonly colors = [
    'rgba(59, 130, 246, 0.6)',   // Blue
    'rgba(147, 51, 234, 0.6)',   // Purple
    'rgba(236, 72, 153, 0.6)',   // Pink
    'rgba(34, 197, 94, 0.6)',    // Green
    'rgba(251, 191, 36, 0.6)',   // Yellow
  ];

  ngOnInit(): void {
    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.initParticles();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.handleResize.bind(this));
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  private handleResize(): void {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
  }

  private handleMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  private initParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    const maxLife = Math.random() * 300 + 200;
    return {
      x: Math.random() * this.canvasWidth,
      y: Math.random() * this.canvasHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      life: maxLife,
      maxLife: maxLife
    };
  }

  private updateParticle(particle: Particle): void {
    // Mouse interaction
    const dx = this.mouseX - particle.x;
    const dy = this.mouseY - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100) {
      const force = (100 - distance) / 100;
      particle.vx += (dx / distance) * force * 0.1;
      particle.vy += (dy / distance) * force * 0.1;
    }

    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Boundary collision
    if (particle.x < 0 || particle.x > this.canvasWidth) {
      particle.vx *= -0.8;
      particle.x = Math.max(0, Math.min(this.canvasWidth, particle.x));
    }
    if (particle.y < 0 || particle.y > this.canvasHeight) {
      particle.vy *= -0.8;
      particle.y = Math.max(0, Math.min(this.canvasHeight, particle.y));
    }

    // Apply friction
    particle.vx *= 0.99;
    particle.vy *= 0.99;

    // Update life
    particle.life--;
    if (particle.life <= 0) {
      Object.assign(particle, this.createParticle());
    }

    // Update opacity based on life
    particle.opacity = (particle.life / particle.maxLife) * 0.7;
  }

  private drawParticle(particle: Particle): void {
    this.ctx.save();
    this.ctx.globalAlpha = particle.opacity;
    
    // Create gradient
    const gradient = this.ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.size * 2
    );
    gradient.addColorStop(0, particle.color);
    gradient.addColorStop(1, 'transparent');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }

  private drawConnections(): void {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
    this.ctx.lineWidth = 1;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const opacity = (120 - distance) / 120 * 0.3;
          this.ctx.globalAlpha = opacity;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
    this.ctx.restore();
  }

  private animate(): void {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Update and draw particles
    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
    });

    // Draw connections
    this.drawConnections();

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

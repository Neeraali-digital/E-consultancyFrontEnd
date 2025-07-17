import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { Footer } from "./layout/footer/footer";
import { AiChatComponent } from "./shared/components/ai-chat/ai-chat.component";
import { ScrollToTopComponent } from "./shared/components/scroll-to-top/scroll-to-top.component";
import { ScrollService } from "./shared/services/scroll.service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Footer, AiChatComponent, ScrollToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('E-consultancyFrontend');

  // Inject ScrollService to initialize scroll-to-top functionality
  private scrollService = inject(ScrollService);
}

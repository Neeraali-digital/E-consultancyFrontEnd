import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { AiChatComponent } from "./shared/components/ai-chat/ai-chat.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AiChatComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('E-consultancyFrontend');
}

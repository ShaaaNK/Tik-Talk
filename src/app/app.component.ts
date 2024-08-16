import {Component} from '@angular/core';
import {ProfileCardComponent} from "./common-ui/profile-card/profile-card.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    ProfileCardComponent,
    RouterOutlet,
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {

}

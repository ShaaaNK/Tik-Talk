import {Component, inject} from '@angular/core';
import {ProfileService} from "./data/services/profile.service";
import {ProfileCardComponent} from "./common-ui/profile-card/profile-card.component";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    ProfileCardComponent,
    JsonPipe
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tik-talk';
  profileService = inject(ProfileService);
  profiles: any = []
  constructor() {
    this.profileService.getTestAcc()
      .subscribe(val => {
        this.profiles = val
      })
  }
}

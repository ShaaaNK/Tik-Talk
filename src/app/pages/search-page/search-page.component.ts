import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from "../../common-ui/profile-card/profile-card.component";
import {ProfileService} from "../../data/services/profile.service";
import {Profile} from "../../data/interfaces/profile.interfaces";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  title = 'tik-talk';
  profileService = inject(ProfileService);
  profiles: Profile[] = []
  constructor() {
    this.profileService.getTestAcc()
      .subscribe(val => {
        this.profiles = val
      })
  }
}

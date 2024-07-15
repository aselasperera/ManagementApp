import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { IUserProfile } from './Userprofile/user-profile.dto';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

    ProfileData: IUserProfile | undefined ;

    @ViewChild('menubutton') menuButton!: ElementRef;

    constructor(public layoutService: LayoutService,
                public auth: AuthService) { }

    ngOnInit() {
      this.auth.user$.subscribe((user: any) => {
        if (user) {
          this.ProfileData = user;
        }
      });
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
    }
    
}
import { Component, Inject } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { IUserProfile } from './Userprofile/user-profile.dto';

@Component({
    selector: 'app-profilemenu',
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent {

    ProfileData: IUserProfile | undefined ;

    constructor(public layoutService: LayoutService,
        private router: Router,
        public auth: AuthService,
        @Inject(DOCUMENT) private doc: Document) { }

    ngOnInit() {
    this.auth.user$.subscribe((user: any) => {
        if (user) {
        this.ProfileData = user;
        }
    });
    }

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }

    logout() {
        this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
      }

    profile(){
    this.router.navigate(["/user-profile"]);
    }
}
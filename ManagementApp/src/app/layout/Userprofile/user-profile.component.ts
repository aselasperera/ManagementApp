import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, map, Subscription } from 'rxjs';
import { IUserProfile } from './user-profile.dto';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit{

    ProfileData: IUserProfile | undefined ;
    submitted: boolean = false;

    constructor(public auth: AuthService) {}

    ngOnInit() {
      this.auth.user$.subscribe((user: any) => {
        if (user) {
          this.ProfileData = user;
        }
      });
    }
    getUserMetadataKeys() {
      return this.ProfileData?.user_metadata ? Object.keys(this.ProfileData.user_metadata) : [];
    }

}

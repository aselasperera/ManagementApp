import { Component, ElementRef, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent implements OnInit{
    timeout: any = null;
    companyLogo: any

    constructor(public layoutService: LayoutService, public el: ElementRef) { }

    ngOnInit(): void {
        if (environment.CompanyLogo){
            this.companyLogo=environment.CompanyLogo
        } else {
            this.companyLogo="../assets/logo/blank.png"
        }
    }

    onMouseEnter() {
        if (!this.layoutService.state.anchored) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.layoutService.state.revealMenuActive = true;
        }
    }

    onMouseLeave() {
        if (!this.layoutService.state.anchored) {
            if (!this.timeout) {
                this.timeout = setTimeout(() => this.layoutService.state.revealMenuActive = false, 300);
            }
        }
    }

    anchor() {
        this.layoutService.state.anchored = !this.layoutService.state.anchored;
    }

}

import {Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RoleConfig } from './roleConfig/roleConfig';
import { RoleConfigService } from 'src/services/role-config.service';

@Component({
    selector: 'app-menu',
    template: `
        <div class="menu">
            <ul class="layout-menu">
                <li
                    app-menuitem
                    *ngFor="let item of filteredModel; let i = index"
                    [item]="item"
                    [index]="i"
                    [root]="true"
                ></li>
            </ul>
        </div>
    `,
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    filteredModel: any[] = [];
    userRole: string | null = null;
    roleConfig : RoleConfig = {}

    constructor(private authService: AuthService, private roleConfigService:RoleConfigService) {
        
    }

    //--get required roles array--
    getRolesForService(serviceId: string): string[] {
        const roles: string[] = [];

        for (const role in this.roleConfig) {
            if (this.roleConfig[role][serviceId]!==undefined) {
                roles.push(role);
            }
        }
        return roles;
    }

    //--render menu--
    filterMenu() {
        console.log("filter menu--",this.userRole)
        if (this.userRole !== null) {
            // Filter items based on the user's role
            this.filteredModel = this.model.map((section) => ({
                ...section,
                items: section.items.filter((item: any) =>
                    item.roles.includes(this.userRole as string)
                ),
            }));
        }
    }

    ngOnInit() {
        this.roleConfigService.roleConfig$.subscribe((config)=>{
        this.roleConfig = config;
        this.model = [
            {
                // label: 'Dashboard',
                // icon: 'pi pi-fw pi-align-left',
                items: [
                    // Generated Pages
                    {label: 'User', icon: 'pi pi-fw pi-home', roles: this.getRolesForService(' DTO672 '), routerLink: ['pages/user'] },
			{label: 'Role', icon: 'pi pi-fw pi-home', roles: this.getRolesForService(' DTO673 '), routerLink: ['pages/role'] },
			{label: 'Employee', icon: 'pi pi-fw pi-home', roles: this.getRolesForService(' DTO676 '), routerLink: ['pages/employee'] },
			
                    ]
            }
        ];

        })
        // Get the user's role from local storage
        this.userRole = localStorage.getItem('roleName');

        if (this.userRole !== null) {
            // Filter items based on the user's role
            this.filteredModel = this.model.map((section) => ({
                ...section,
                items: section.items.filter((item:any) =>
                    item.roles.includes(this.userRole as string)
                ),
            }));
        }
    }
    
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { IRole, RoleDto, transformRolesToRoleConfig } from 'src/dto/Role.dto';
import {
    PermissionCategories,
    roleConfig,
} from './layout/roleConfig/roleConfig';
import { RoleService } from 'src/services/Role.service';
import { Subscription, filter, map } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService, User } from '@auth0/auth0-angular';
import { RoleConfigService } from 'src/services/role-config.service';
import { UserService } from 'src/services/User.service';
import { IUser, UserDto } from 'src/dto/User.dto';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
    inputRoles: RoleDto[] | null = [];
    user: User | undefined = {};
    userRole: string | undefined = '';
    firstName: string = '';
    lastName: string = '';

    isDataLoading: boolean = false;

    private subscription: Subscription = new Subscription();

    constructor(
        private primengConfig: PrimeNGConfig,
        private roleService: RoleService,
        private userService: UserService,
        private authService: AuthService,
        private roleConfigSerice: RoleConfigService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;

        this.authService.user$.subscribe((user) => {
            if (user !== null) {
                // console.log(user, 'user la set eka');
                this.user = user;
                this.userRole = this.user?.['user_metadata']['role'];
                this.findAllRole({});
            } else {
                this.userRole = undefined;
            }
        });
    }

    //--create super admin role--
    createSuperAdminCredentials(role: RoleDto) {
        this.subscription.add(
            this.roleService
                .createRole(role)
                .pipe(
                    filter((res: HttpResponse<IRole>) => res.ok),
                    map((res: HttpResponse<IRole>) => res.body)
                )
                .subscribe(
                    (res: IRole | null) => {
                        if (res) {
                            console.log('super admin role created', res.RoleId);
                            this.splitName();
                            this.createSuperAdminUser({
                                FirstName: this.firstName,
                                LastName: this.lastName,
                                RoleId: res.RoleId,
                                Email: this.user?.email,
                                // FirstName: this.user?.given_name,
                                // LastName: this.user?.family_name,
                                // RoleId: role.RoleId,
                                RoleName: role.Name,
                            });
                        } else {
                            //show error (Failed to create role)--
                            this.showErrorConfirm(
                                'Failed to create super admin role, please try again!'
                            );
                            this.isDataLoading = false;
                        }
                    },
                    (error) => {
                        //show error (Failed to create role)--
                        this.showErrorConfirm(
                            'Failed to create super admin role, please try again!'
                        );
                        this.isDataLoading = false;
                    }
                )
        );
    }

    //--create super admin user acc--
    createSuperAdminUser(user: UserDto) {
        console.log('me inne user', user),
            this.subscription.add(
                this.userService.createUser(user).subscribe(
                    () => {
                        //--all done and refresh--
                        window.location.reload();
                    },
                    (error) => {
                        //--show error--
                        //show error (Failed to create role)--
                        console.log(
                            'error in creating super admin user',
                            error
                        );
                        this.showErrorConfirm(
                            'Failed to create super admin user, please try again!'
                        );
                        this.isDataLoading = false;
                    }
                )
            );
    }

    //--handle authentication rules--
    handleRolesAuthentication() {
        //--check if available role is available--
        if (this.userRole) {
            if (this.userRole == 'Super-Admin') {
                //-check if super admin role available--
                const superAdminRole = this.inputRoles?.find((role) => {
                    return role.Name === 'Super-Admin';
                });
                if (!superAdminRole?.RoleId) {
                    //--create super admin role and user--
                    this.createSuperAdminCredentials({
                        Name: 'Super-Admin',
                        //---!!!!!---this PermissionCategories must be hardcoded when generating app--
                        PermissionCategories: PermissionCategories,
                    });
                } else {
                    //--super admin available--
                    //--check super admin user available--
                    this.validateSuperAdminRoleWithUser(superAdminRole);
                }
            } else {
                const userRoleStruct = this.inputRoles?.find((role) => {
                    return role.Name === this.userRole;
                });
                if (userRoleStruct?.RoleId) {
                    //--ok--
                    this.isDataLoading = false;
                } else {
                    //--show error (no role available in that name)--
                    this.showErrorConfirm(
                        'No role configuration available for user, please try again!'
                    );
                    this.isDataLoading = false;
                }
            }
        } else {
            //--show error (no user role)--
            this.showErrorConfirm(
                'Cannot get role configuration data from auth0, please try again!'
            );
            this.isDataLoading = false;
        }
    }

    validateSuperAdminRoleWithUser(role: RoleDto) {
        this.subscription.add(
            this.userService
                .findAllUser({})
                .pipe(
                    filter((res: HttpResponse<IUser[]>) => res.ok),
                    map((res: HttpResponse<IUser[]>) => res.body)
                )
                .subscribe(
                    (res: IUser[] | null) => {
                        const superAdminUser = res?.find((user) => {
                            return user.RoleId === role.RoleId;
                        });

                        if (!superAdminUser?.UserId) {
                            //--no user for role--
                            this.splitName();
                            this.createSuperAdminUser({
                                // FirstName: this.user?.given_name,
                                // LastName: this.user?.family_name,
                                FirstName: this.firstName,
                                LastName: this.lastName,
                                Email: this.user?.email,
                                // RoleId: role.RoleId,
                                RoleName: role.Name,
                            });
                        } else {
                            this.isDataLoading = false;
                        }
                    },

                    (res: HttpErrorResponse) => {
                        this.showErrorConfirm(
                            'Cannot get role configuration data from user, please try again!'
                        );
                        this.isDataLoading = false;
                    }
                )
        );
    }

    //--roles get--
    findAllRole(params: any) {
        this.isDataLoading = true;
        this.subscription.add(
            this.roleService
                .findAllRole(params)
                .pipe(
                    filter((res: HttpResponse<IRole[]>) => res.ok),
                    map((res: HttpResponse<IRole[]>) => res.body)
                )
                .subscribe(
                    (res: IRole[] | null) => {
                        this.inputRoles = res;

                        const newRoleConfig = transformRolesToRoleConfig(
                            this.inputRoles ? this.inputRoles : []
                        );

                        // Merging into the existing roleConfig
                        Object.assign(roleConfig, newRoleConfig);
                        this.roleConfigSerice.setRoleConfig(roleConfig);

                        //--validate roles--
                        this.handleRolesAuthentication();
                    },

                    (res: HttpErrorResponse) => {
                        console.log('error in extracting all Role', res);
                        this.showErrorConfirm(
                            'Cannot get roles configuration data, please try again!'
                        );
                        this.isDataLoading = false;
                    }
                )
        );
    }

    showErrorConfirm(text: string) {
        this.confirmationService.confirm({
            header: 'Error',
            message: text,
            accept: () => {
                window.location.reload();
            },
            rejectVisible: false,
            acceptLabel: 'Ok',
            acceptIcon: '',
        });
    }

    splitName(): void {
        if (this.user?.name) {
            const nameParts = this.user.name.split(' ');
            this.firstName = nameParts[0] || '';
            this.lastName = nameParts.slice(1).join(' ') || '';
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

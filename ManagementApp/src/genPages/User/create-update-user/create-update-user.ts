import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, filter, map } from 'rxjs';
import { IUser, UserDto } from '../../../dto/User.dto';
import { UserService } from '../../../services/User.service';
import { RoleDto } from 'src/dto/Role.dto';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RoleService } from 'src/services/Role.service';

// @ts-ignore
@Component({
    selector: 'app-create-task',
    templateUrl: './create-update-user.html',
})
export class CreateUpdateUser implements OnInit, OnDestroy {
    user: UserDto = {};

    submitted: boolean = false;

    rolesData: RoleDto[] = [];
    isLoadingClient: boolean = false;
    tempRoleData: RoleDto = {};

    private subscription: Subscription = new Subscription();

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        public config: DynamicDialogConfig,
        private roleService: RoleService,
        public ref: DynamicDialogRef
    ) {}

    ngOnInit(): void {
        //set default data
        this.findAllRoles({});

        //edit user if requested by the row click
        if (this.config.data != null) {
            this.editUser(this.config.data);
        }
    }

    //Find all data from db
    findAllRoles(params: any) {
        this.isLoadingClient = true;
        this.subscription.add(
            this.roleService
                .findAllRole(params)
                .pipe(
                    filter((res: HttpResponse<RoleDto[]>) => res.ok),
                    map((res: HttpResponse<RoleDto[]>) => res.body)
                )
                .subscribe(
                    (res: RoleDto[] | null) => {
                        if (res != null) {
                            this.rolesData = res;

                            this.tempRoleData =
                                res.find((resp) => {
                                    return resp.RoleId === this.user.RoleId;
                                }) || {};
                        } else {
                            this.rolesData = [];
                        }
                        this.isLoadingClient = false;
                    },

                    (res: HttpErrorResponse) => {
                        this.isLoadingClient = false;
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Unable To Load Clients',
                        });
                    }
                )
        );
    }

    save() {
        this.submitted = true;

        if (this.checkValidation()) {
            //update if their is an objectId
            if (this.user.UserId) {
                this.subscription.add(
                    this.userService.updateUser(this.user).subscribe(
                        () => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Update Successfully',
                                life: 3000,
                            });
                            this.CloseInstances();
                        },
                        (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Unable To Update User',
                            });
                        }
                    )
                );
            }
            //else create user
            else {
                this.subscription.add(
                    this.userService.createUser(this.user).subscribe(
                        () => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Create Successfully',
                                life: 3000,
                            });
                            this.CloseInstances();
                        },
                        (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Unable To Create User',
                            });
                        }
                    )
                );
            }
        } else {
        }
    }

    //close dialog instances
    CloseInstances() {
        this.ref.close(this.user);
        this.submitted = false;
        this.user = {};
    }

    //unsubscribe all the services
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    //edit user
    editUser(user: UserDto) {
        this.user = { ...user };
    }

    onClientChange() {
        this.user.RoleId = this.tempRoleData.RoleId;
        this.user.RoleName = this.tempRoleData.Name;
    }

    //format date
    formatDate(date: string | number | Date) {
        let newdate = new Date(date);
        let month = ('0' + (newdate.getMonth() + 1)).slice(-2);
        let day = ('0' + newdate.getDate()).slice(-2);

        if (date) {
            return newdate.getFullYear() + '-' + month + '-' + day;
        } else {
            return '-';
        }
    }

    checkValidation() {
        if (
            this.tempRoleData &&
            this.user.FirstName &&
            this.user.LastName &&
            this.user.Email
        ) {
            return true;
        } else {
            return false;
        }
    }
}

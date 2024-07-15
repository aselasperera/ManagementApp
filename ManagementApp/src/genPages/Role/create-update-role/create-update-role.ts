import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Subscription} from "rxjs";
import {IRole,RoleDto} from "../../../dto/Role.dto";
import {RoleService} from "../../../services/Role.service";

// @ts-ignore
@Component({
    selector: 'app-create-task',
    templateUrl: './create-update-role.html',

})
export class CreateUpdateRole implements OnInit, OnDestroy {
    role: RoleDto = {};

    submitted: boolean = false;

    private subscription: Subscription = new Subscription();

    constructor(private roleService: RoleService, private messageService: MessageService, public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    }

    ngOnInit(): void {
        //set default data
        
            
        
            
        
            
        
            
        

        //edit role if requested by the row click
        if (this.config.data != null) {
            this.editRole(this.config.data)
        }

    }

    
    
    
    
    
    
    
    
    
    


    save() {
        this.submitted = true

        //update if their is an objectId
        if (this.role.RoleId) {
            this.subscription.add(
                this.roleService.updateRole(this.role).subscribe(() => {
                    this.CloseInstances();

                })
            );

            this.messageService.add({
                severity: 'success',
                summary: 'Update Successfully',
                detail: `  updated successfully.`,
                life: 3000
            });
        }
        //else create role
        else {
            this.subscription.add(
                this.roleService.createRole(this.role).subscribe(() => {
                    this.CloseInstances();
                })
            );

            this.messageService.add({
                severity: 'success',
                summary: 'Create Successfully ',
                detail: ` created successfully.`,
                life: 3000
            });
        }

    }


    //close dialog instances
    CloseInstances() {
        this.ref.close(this.role)
        this.submitted = false
        this.role = {}

    }

    //unsubscribe all the services
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    //edit role
    editRole(role: RoleDto) {
        this.role = {...role};
    }

    //format date
    formatDate(date: string | number | Date) {
        let newdate = new Date(date)
        let month = ("0" + (newdate.getMonth() + 1)).slice(-2)
        let day = ("0" + (newdate.getDate())).slice(-2)

        if (date) {
            return newdate.getFullYear() + "-" + (month) + "-" + (day)
        } else {
            return "-"
        }
    }
}

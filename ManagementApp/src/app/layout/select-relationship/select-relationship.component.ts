import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { dtoIdNameConfig, getRelationshipListByDtoId } from 'src/app/layout/relationshipConfig/reationshipConfig';

@Component({
    selector: 'app-select-relationship',
    templateUrl: './select-relationship.component.html',
})
export class SelectRelationshipComponent {

    itemsData: dtoIdNameConfig[] = [];
    dtoId: string = '';

    submitted: boolean = false;

    private subscription: Subscription = new Subscription();

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private router: Router
    ) {}

    ngOnInit(): void {
        //set default data

        //edit order if requested by the row click
        if (this.config.data != null) {
            this.editOrder(this.config.data);
        }
    }

    //close dialog instances
    CloseInstances() {
        this.ref.close({});
        this.submitted = false;
    }

    //unsubscribe all the services
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    //edit order
    editOrder(dtoId: string) {
        this.dtoId = dtoId;
        this.itemsData = getRelationshipListByDtoId(dtoId) || [];
    }

    //--view relationship--
    visit(itemName:string){
        this.router.navigate(['/pages/'+itemName.toLowerCase()], { queryParams: { id: this.dtoId } });
        this.CloseInstances();
    }
}

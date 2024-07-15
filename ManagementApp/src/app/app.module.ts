import { NgModule } from '@angular/core';
import {CommonModule, DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import {TableModule} from 'primeng/table';
import {ProgressBarModule} from "primeng/progressbar";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from "primeng/dataview";
import {ToastModule} from "primeng/toast";
import {EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {AutoCompleteModule} from "primeng/autocomplete";
import {AvatarModule} from 'primeng/avatar';
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {InputNumberModule} from "primeng/inputnumber";
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {AuthHttpInterceptor, AuthModule, AuthService} from '@auth0/auth0-angular';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {environment} from "../environments/environment";
import { UserProfileComponent } from '../app/layout/Userprofile/user-profile.component';
import { SelectRelationshipComponent } from './layout/select-relationship/select-relationship.component';
import { CamelCaseToTitlePipe } from './camel-case-to-title.pipe';  




// Generated Pages
import {UserComponent} from "../genPages/User/User.component"; 
import {RoleComponent} from "../genPages/Role/Role.component"; 
import {EmployeeComponent} from "../genPages/Employee/Employee.component"; 

import {CreateUpdateUser} from "./../genPages/User/create-update-user/create-update-user"; 
import {CreateUpdateRole} from "./../genPages/Role/create-update-role/create-update-role"; 
import {CreateUpdateEmployee} from "./../genPages/Employee/create-update-employee/create-update-employee"; 


// Generated Services
import {UserService} from "../services/User.service";  
import {RoleService} from "../services/Role.service";  
import {EmployeeService} from "../services/Employee.service";  
import { RoleConfigService } from 'src/services/role-config.service';
import { PermissionCategories } from './layout/roleConfig/roleConfig';




@NgModule({
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        TableModule,
        DatePipe,
        ProgressBarModule,
        CommonModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        DataViewModule,
        DropdownModule,
        ToastModule,
        EditorModule,
        FormsModule,
        CalendarModule,
        AutoCompleteModule,
        InputNumberModule,
        ConfirmDialogModule,
        PasswordModule,
        RadioButtonModule,
        AvatarModule,
        InputTextareaModule,
        // Import the module into the application, with configuration
        AuthModule.forRoot({
  domain: environment.AUTH0DOMAIN,
      clientId: environment.AUTH0CLIENTID,
      authorizationParams: {
        redirect_uri: environment.REDIRECTURL
      }
        }),
    ],
    declarations: [

        AppComponent,
        UserProfileComponent,
        SelectRelationshipComponent,
        CamelCaseToTitlePipe,


        // Generated Pages
        UserComponent,
		RoleComponent,
		EmployeeComponent,
		
        CreateUpdateUser,
CreateUpdateRole,
CreateUpdateEmployee,


        //--features--
        
    ],
    providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptor,
          multi: true,
        },
        {
              provide: Window,
              useValue: window,
            },
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        DialogService,MessageService,ConfirmationService,
        // Generated Services
        UserService,
		RoleService,
		EmployeeService,
    RoleConfigService,
    
		



    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {Table} from 'primeng/table';
import {filter, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {DomSanitizer} from '@angular/platform-browser';
import { roleConfig } from 'src/app/layout/roleConfig/roleConfig';
import {IEmployee,EmployeeDto} from "../../dto/Employee.dto";
import {EmployeeService} from "../../services/Employee.service";
import {CreateUpdateEmployee } from "./create-update-employee/create-update-employee";

import { getDtoNameById } from 'src/app/layout/relationshipConfig/reationshipConfig';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './Employee.component.html'
})

export class EmployeeComponent implements OnInit {

    EmployeeData: EmployeeDto[] = [];

    isDataLoading: boolean = false;
    canUpdate:boolean = true;
    canDelete:boolean = true;
    roleConfig=roleConfig

    
    dtoName :string | undefined = "Employee"
    



    

    private subscription: Subscription = new Subscription();


    constructor(private route:ActivatedRoute,private sanitizer: DomSanitizer,private employeeService: EmployeeService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router,  private dialogService: DialogService) {
    }

    ngOnInit() {

        
                this.findAllEmployee({})
                this.isDataLoading = true;
        
        
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    navigateToCreateUser() {
        this.router.navigate(['profile/create'])
    }

      downloadFile() {
        this.employeeService.downloadFile().subscribe(
            (response: HttpResponse<Blob>) => {
                // Extract filename from content-disposition header
                const contentDispositionHeader: string | null =
                    response.headers.get('content-disposition');
                const filename: string = this.getFilenameFromContentDisposition(
                    contentDispositionHeader
                );

                if (response.body) {
                    // Create URL for the blob data
                    const blobUrl: string = window.URL.createObjectURL(
                        response.body
                    );
                    // Create an anchor element and trigger download
                    const a = document.createElement('a');
                    document.body.appendChild(a);
                    a.href = blobUrl;
                    a.download = filename;
                    a.click();

                    // Clean up
                    window.URL.revokeObjectURL(blobUrl);
                    document.body.removeChild(a);
                }
                this.messageService.add({
                    severity: 'success',
                    summary: 'Download Successfull',
                    detail: ` Excel successfully downloaded.`,
                    life: 3000,
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Download Failed',
                    detail: ` Failed to download excel.`,
                    life: 3000,
                });
            }
        );
    }


    private getFilenameFromContentDisposition(header: string | null): string {
        const today = new Date();
        const date = today.toISOString().slice(0, 10);

        if (!header) {
            return 'Employees_' + date + '.csv';
        }
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(header);
        if (!matches || !matches[1]) {
            return 'Employees_' + date + '.csv';
        }
        return matches[1].replace(/['"]/g, '');
    }

    uploadFile(event: any) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);

    this.employeeService.uploadFile(formData).subscribe(
        (response) => {
            // Handle success
            this.messageService.add({
                severity: 'success',
                summary: 'Upload Successful',
                detail: `File "${file.name}" successfully uploaded.`,
                life: 3000,
            });
        },
        (error) => {
            // Handle error
            this.messageService.add({
                severity: 'error',
                summary: 'Upload Failed',
                detail: `Failed to upload file "${file.name}".`,
                life: 3000,
            });
        }
    );
    }

    

    //--find all--
    findAllEmployee(params: any) {
    this.subscription.add(
                this.employeeService.findAllEmployee(params).pipe(
                filter((res: HttpResponse<IEmployee[]>) => res.ok),
                map((res: HttpResponse<IEmployee[]>) => res.body)
            )
                .subscribe(
                    (res: IEmployee[] | null) => {
                        if (res != null) {
                            this.EmployeeData = res;
                        } else {
                            this.EmployeeData = [];
                        }
                        this.isDataLoading = false;
                    },

                    (res: HttpErrorResponse) => console.log("error in extracting all Employee", res)
                )
            );
        }
    
    //dynamic dialog
    showCreateEmployeeDialog() {
    const screenWidth = window.innerWidth;
    let dialogWidth = '80%'; // Default width

    // Define width based on screen size
    if (screenWidth > 431) {
        dialogWidth = '60%'; // Adjust as needed for smaller screens
    } else {
        dialogWidth = '80%'; // Adjust as needed for larger screens
    }
        const ref = this.dialogService.open(CreateUpdateEmployee, {
            header: 'Create Employee',
            width: dialogWidth,
            closable: true,
            contentStyle: {
                "max-height": "720px",
                "overflow": "auto",
                "closable": "true"
            }
        })        
        ref.onClose.subscribe(() => {
            this.findAllEmployee({})
        })}

    //dynamic dialog
  //  showCreateEmployeeDialogDefault() {
  //      const ref = this.dialogService.open(CreateUpdateEmployee, {
  //          header: 'Create Employee',
  //          width: '60%',
  //          closable: true,
  //          contentStyle: {
  //              "max-height": "720px",
  //              "overflow": "auto",
  //              "closable": "true"
  //          }
  //      })
  //      ref.onClose.subscribe(() => {
  //          this.findAllEmployee({})
   //     })
  //  }



    showEditEmployeeDialog(Employee: EmployeeDto) {
    const screenWidth = window.innerWidth;
    let dialogWidth = '80%'; // Default width

    // Define width based on screen size
    if (screenWidth > 431) {
        dialogWidth = '60%'; // Adjust as needed for smaller screens
    } else {
        dialogWidth = '80%'; // Adjust as needed for larger screens
    }
        const ref = this.dialogService.open(CreateUpdateEmployee , {
            data: Employee,
           // header: 'Update Employee ' + Employee.itemName,
            width: dialogWidth,
            closable: true,
            contentStyle: {
                "max-height": "720px",
                "overflow": "auto",
                "closable": "true"
            }
        })
        ref.onClose.subscribe(() => {
            this.findAllEmployee({})
        })
    }

    //delete Employee
    deleteEmployee(event: MouseEvent,Employee: EmployeeDto) {
        event.stopPropagation(); 
        this.confirmationService.confirm({
           // message: `Are you sure that you want to delete "${ Employee.itemName}"?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ConfirmDeleteEmployee(Employee)
                this.messageService.add({
                    severity: 'error',
                    summary: 'Deleted',
                    detail: 'You have deleted ' 
                });
            },
        });
    }
ConfirmDeleteEmployee(Employee: EmployeeDto) {
    this.EmployeeData = this.EmployeeData.filter(val => val.EmployeeId !== Employee.EmployeeId);
    this.subscription.add(
        this.employeeService.deleteEmployee({ employeeId: Employee.EmployeeId }).subscribe(() => {
        })
    );
}
    //remove html meta data
    removeHtmlTags(description: string): string {
        return description.replace(/<[^>]*>/g, '');
    }

}

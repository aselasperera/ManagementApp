import {ChangeDetectorRef,Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Subscription} from "rxjs";
import { NgxPhotoEditorService } from "ngx-photo-editor";
import { HttpClient } from '@angular/common/http';
import {IEmployee,EmployeeDto} from "../../../dto/Employee.dto";
import {EmployeeService} from "../../../services/Employee.service";

// @ts-ignore
@Component({
    selector: 'app-create-task',
    templateUrl: './create-update-employee.html',

})
export class CreateUpdateEmployee implements OnInit, OnDestroy {
    employee: EmployeeDto = {};

    
      
      
    
      
      
    
      
      
    
      
      
    
      
      
    
      
      
    
      
      
    
      
      
    
      
      
    
      
      
    
      
      
    
      
        options: any[] = ["Male", "Female", "Other"]
      
      
    

    isEdit: number = -1;
    isLoading: boolean = false;
    submitted: boolean = false;
    propicPreviewUrl: string = "";
    coverpicPreviewUrl: string = "";
    isImageUploading: boolean = false;
    croppedProfileImage: any = "";
    croppedCoverImage: any = "";
    propicChangedEvent: any = "";
    coverChangedEvent: any = "";
    visible: any;

    private subscription: Subscription = new Subscription();

    constructor(private employeeService: EmployeeService, private messageService: MessageService, public config: DynamicDialogConfig, public ref: DynamicDialogRef, private photoService: NgxPhotoEditorService, private cdr: ChangeDetectorRef, private http: HttpClient) {
    }

    ngOnInit(): void {
        //set default data
        
            
        
            
        
            
        
            
        
            
        
            
        
            
        
            
        
            
        
            
        
            
        
            
        

        //edit employee if requested by the row click
        if (this.config.data != null) {
            this.editEmployee(this.config.data)
            this.isEdit = 0;
            this.propicPreviewUrl = this.employee.ProfileImage || "";
            this.coverpicPreviewUrl = this.employee.CoverImage || "";
            
              
            
              
            
              
            
              
            
              
            
              
            
              
            
              
            
              
            
              
            
              
            
              
            
        }
        if (this.config.data == null) {
            this.isEdit = -1;
        }

    }

    OnEdit() {
      this.isEdit = 1;
    }

  PropicChangeEvent(event: any): void {
    // Check if the user canceled the file open
    if (event.target.files.length > 0) {
      this.photoService
        .open(event, {
          aspectRatio: 4 / 4,
          autoCropArea: 1,
          roundCropper: true,
          modalTitle: "Crop Profile Photo",
        })
        .subscribe((data) => {
          this.croppedProfileImage = data.file;
          this.saveCroppedImage("profile");
        });
    } else {
      console.log("Not found");
    }
  }

    CoverPicChangeEvent(event: any): void {
      // Check if the user canceled the file open
      if (event.target.files.length > 0) {
        this.photoService
          .open(event, {
            aspectRatio: 18 / 5,
            autoCropArea: 1,
            roundCropper: true,
            modalTitle: "Crop Profile Photo",
          })
          .subscribe((data) => {
            this.croppedCoverImage = data.file;
            this.saveCroppedImage("cover");
          });
      } else {
        console.log("Not found");
      }
    }

    saveCroppedImage(type: string) {
      if (type === 'profile') {
        this.isImageUploading = true;
        const formData = new FormData();
        formData.append("file", this.croppedProfileImage);
        
        this.http.post<any>('https://filedrop.cgaas.ai/FileMangerService/api/UploadToLocal', formData)
          .subscribe(
            (response) => {
              this.employee.ProfileImage = response;
            },
            (error) => {
              console.error("Error uploading image:", error);
            }
          );

        let reader = new FileReader();
        reader.readAsDataURL(this.croppedProfileImage);
        reader.onload = (event: any) => {
          this.propicPreviewUrl = event.target.result;
          this.cdr.detectChanges();
        };
      }
      if (type === 'cover') {
        this.isImageUploading = true;
        const formData = new FormData();
        formData.append("file", this.croppedCoverImage);
        
        this.http.post<any>('https://filedrop.cgaas.ai/FileMangerService/api/UploadToLocal', formData)
          .subscribe(
            (response) => {
              this.employee.CoverImage = response
            },
            (error) => {
              console.error("Error uploading image:", error);
            }
          );

        let reader = new FileReader();
        reader.readAsDataURL(this.croppedCoverImage);
        reader.onload = (event: any) => {
          this.coverpicPreviewUrl = event.target.result;
          this.cdr.detectChanges();
        };
      }
      
  }

    
    
    
    
    
    
    
    
    
    
    
        
        
        fileUpload(event: any, name: string) {
            const file: File = event.target.files[0];
            const formData: FormData = new FormData();
            formData.append('file', file);

            this.employeeService.fileUpload(formData).subscribe(
            (response: any) => {
                switch (name) {
                
                
                
                
                
                
                
                
                
                
                  case 'ProfileImage':
                    this.employee.ProfileImage = response; 
                    break;
                
                
                
                  case 'CoverImage':
                    this.employee.CoverImage = response; 
                    break;
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                default:
                    break;
                }

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
        
    
    
    
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    


    save() {
        this.submitted = true
        //update if their is an objectId
        if (this.employee.EmployeeId) {
            this.subscription.add(
                this.employeeService.updateEmployee(this.employee).subscribe(() => {
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
        //else create employee
        else {
            this.subscription.add(
                this.employeeService.createEmployee(this.employee).subscribe(() => {
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
        this.ref.close(this.employee)
        this.submitted = false
        this.employee = {}

    }

    //unsubscribe all the services
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    //edit employee
    editEmployee(employee: EmployeeDto) {
        this.employee = {...employee};
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

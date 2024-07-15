import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import { EmployeeDto, IEmployee } from "../dto/Employee.dto";

type EntityResponseType = HttpResponse<EmployeeDto>;
type EntityArrayResponseType = HttpResponse<EmployeeDto[]>;

// @ts-ignore
@Injectable()
export class EmployeeService {

    resourceUrl = environment.serverUrl

    headers = {
        AuthToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImRhbWluZHUifQ.B8BvnQhFGX7QMJzsSH8z5mJwss3YdpHpSBH7M9Zia4k"
    }

    constructor(private http: HttpClient) { }
    

    
    
    
        createEmployee(employee: IEmployee): Observable<HttpResponse<EmployeeDto>> {
            
            return this.http.post<EmployeeDto>(`${this.resourceUrl}/gateway/employeemgt-app289/create/employee`, employee, { observe: 'response', headers: this.headers });
            
        }

        uploadFile(formData: FormData): Observable<HttpResponse<any>> {
                
                return this.http.post(`${this.resourceUrl}/gateway/employeemgt-app289/upload/employee`,formData,{ observe: 'response' });
                
        }
    


    

    

    

    

    

    

    

    

    

    

    

    


    

    
    
    
    


    
        updateEmployee(employee: IEmployee): Observable<HttpResponse<EmployeeDto>> {
             
             return this.http.put<EmployeeDto>(`${this.resourceUrl}/gateway/employeemgt-app289/update/employee`, employee, { observe: 'response', headers: this.headers });
             
        }
    

    

    

    

    

    

    

    

    

    

    

    


    

    
    
    
    


    

    

    

    

    

    

    

    

    

    

    
    deleteEmployee(req?: any): Observable<HttpResponse<IEmployee>> {
             
              return this.http.delete<EmployeeDto>(`${this.resourceUrl}/gateway/employeemgt-app289/delete/employee`, { params: req, observe: 'response', headers: this.headers });
             
    }
    

    


    

    
    
    
    


    

    

    

    

    

    

    

    

    

    
    findEmployee(req?: any): Observable<HttpResponse<IEmployee>> {
            
             return this.http.get<EmployeeDto>(`${this.resourceUrl}/gateway/employeemgt-app289/find/employee`, { params: req, observe: 'response', headers: this.headers });
             
    }
    

    

    


    

    
    
    
    


    

    

    
    findAllEmployee(params: any): Observable<HttpResponse<EmployeeDto[]>> {
            
            return this.http.get<EmployeeDto[]>(`${this.resourceUrl}/gateway/employeemgt-app289/findall/employee`, { params, observe: 'response', headers: this.headers });
            
    }

    downloadFile(): Observable<HttpResponse<Blob>> {
        
        return this.http.get(`${this.resourceUrl}/gateway/employeemgt-app289/download/employee`, { observe: 'response', responseType: "blob" });
        
    }
    

    

    

    

    

    

    

    

    

    


    

    
    
    
    


    

    
        fileUpload(formData: FormData): Observable<HttpResponse<any>> {
                return this.http.post(`https://filedrop.cgaas.ai/FileMangerService/api/UploadToLocal`,formData,{ observe: 'response' });
        }
    

    

    

    

    

    

    

    

    

    

    


    

    
    
    
    


    

    

    

    

    

    

    

    

    

    

    

    


    

    
    


}

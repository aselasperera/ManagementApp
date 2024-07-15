import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoleConfig } from 'src/app/layout/roleConfig/roleConfig';

@Injectable({
  providedIn: 'root'
})
export class RoleConfigService {
  private roleConfigSubject = new BehaviorSubject<RoleConfig>({});
  roleConfig$ = this.roleConfigSubject.asObservable();

  setRoleConfig(config: RoleConfig) {
    this.roleConfigSubject.next(config);
  }

  getRoleConfig() {
    return this.roleConfigSubject.value;
  }
}

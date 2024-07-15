import { PermissionCategoryDto } from 'src/dto/Role.dto';

export type RolePermissions = {
    [dtoId: string]: string[] | undefined;
};

export type RoleConfig = {
    [roleName: string]: RolePermissions;
};

export const roleConfig: RoleConfig = {};
export const PermissionCategories: PermissionCategoryDto[] = [
    
    {
        ServiceName: 'User',
        ServiceId: 'DTO672',
        Permissions: [
            { Name: 'Add', Key: 'A' },
            { Name: 'Update', Key: 'U' },
            { Name: 'Read', Key: 'R' },
            { Name: 'Delete', Key: 'D' },
        ],
    },
   
    {
        ServiceName: 'Role',
        ServiceId: 'DTO673',
        Permissions: [
            { Name: 'Add', Key: 'A' },
            { Name: 'Update', Key: 'U' },
            { Name: 'Read', Key: 'R' },
            { Name: 'Delete', Key: 'D' },
        ],
    },
   
    {
        ServiceName: 'Employee',
        ServiceId: 'DTO676',
        Permissions: [
            { Name: 'Add', Key: 'A' },
            { Name: 'Update', Key: 'U' },
            { Name: 'Read', Key: 'R' },
            { Name: 'Delete', Key: 'D' },
        ],
    },
   
];
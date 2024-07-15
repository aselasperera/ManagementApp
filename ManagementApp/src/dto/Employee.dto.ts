export interface IEmployee {
    EmployeeId?: string;
FirstName?: string;
LastName?: string;
Email?: string;
ProfileImage?: string;
CoverImage?: string;
Country?: string;
Age?: string;
Position?: string;
Salary?: string;
Phone?: string;
Gender?: string;

}

export class EmployeeDto implements IEmployee {
    constructor(
        public EmployeeId?: string,
public FirstName?: string,
public LastName?: string,
public Email?: string,
public ProfileImage?: string,
public CoverImage?: string,
public Country?: string,
public Age?: string,
public Position?: string,
public Salary?: string,
public Phone?: string,
public Gender?: string,

    ) {
    }
}



/* Interface for user registration*/
export interface IClownData{
    name:string;
    dob:string;
    address:string;
    clownType:string;
    email:string;
}

export enum ErrorCode{
    Succeed = 100,
    Failed = 300
}

export interface ILoginData{
    userName:string;
    password:string
}
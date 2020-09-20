
export interface ResponseModel<T> {
    Success: boolean;
    Errors: string[];
    Body: T;
}
export interface LinkModel {
    Id: number;
    Title: string;
    Description: string;
    Link: string;
}
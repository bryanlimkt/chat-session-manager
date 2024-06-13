export declare class BasePresenter<T = any> {
    status: number;
    message: string;
    data: T;
    constructor(status: number, message: string, data?: T);
}

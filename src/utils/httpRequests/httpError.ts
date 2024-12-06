export class HttpError {
    private errorMessage: string = '';
    
    constructor(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

    public getErrorMessage() {
        return this.errorMessage;
    }
}

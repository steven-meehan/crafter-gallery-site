import { ReactNode } from "react";

class ErrorProps {
    errorMessages: string[] = [];

    constructor(errorProps?: {
        errorMessages: string[]
    }){
        if(errorProps){
            this.errorMessages = errorProps.errorMessages ? errorProps.errorMessages : [];
        } else {
            this.errorMessages = [];
        }
    }
}

export default ErrorProps;
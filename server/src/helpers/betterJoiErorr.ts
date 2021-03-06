import { ValidationError } from "joi";
//
type JoiError = {
    message: string;
    path: string[];
    type: string;
    context: {
        label: string;
        key: string;
    };
};
//
type BetterJoiError = {
    message: string;
    type: string;
    element: string;
};
//
export default (joiErrorsSchema: ValidationError): BetterJoiError[] => {
    return joiErrorsSchema.details.map((singleError: JoiError) => {
        const result = {} as BetterJoiError;
        //
        result.element = singleError.path[0];
        result.type = singleError.type.split(".")[1];
        result.message = singleError.message;
        //
        return result;
    });
};

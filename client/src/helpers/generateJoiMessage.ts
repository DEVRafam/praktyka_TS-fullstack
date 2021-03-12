import { JoiError } from "@/@types/joiError";
import { computed, ComputedRef } from "vue";
//
type Result = ComputedRef<string | boolean>;
//
// eslint-disable-next-line
export default (errors: JoiError[] | any, certin: string): Result => {
    return computed<string | boolean>(() => {
        if (!(errors.value instanceof Array)) return false;
        //
        const emailError = errors.value.find((el: JoiError) => el.element === certin);
        if (emailError) return emailError.message;
        else return false;
    });
};

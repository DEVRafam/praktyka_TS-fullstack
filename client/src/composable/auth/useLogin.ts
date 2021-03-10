import axios from "axios";
import { ref, computed, ComputedRef } from "vue";
import { API_ADDRESS } from "@/composable/env";
import { JoiError } from "@/@types/joiError";
import generateJoiMessage from "@/helpers/generateJoiMessage";
//
//
//
type Errors = JoiError[] | "credentials_do_not_match";
interface LoginResponse {
    result: "positive" | "negative";
    errors?: Errors;
    tokens?: {
        accessToken: string;
        refreshToken: string;
    };
    userData?: {
        id: any;
        name: string;
        surname: string;
        email: string;
    };
}
//
//
//
const email = ref<string>("jebac_gorzen@gmail.com");
const password = ref<string>("qwertyjebacgorzen");
const errors = ref<Errors>([]);
//
const credentialsErrorMessage = computed<string | boolean>(() => {
    if (errors.value === "credentials_do_not_match") return "Either email or password is invalid!";
    else return false;
});
//
const emailErrorMessage = generateJoiMessage(errors, "email");
const passwordErrorMessage = generateJoiMessage(errors, "password");
//
const handleLogin = async () => {
    const { data }: { data: LoginResponse } = await axios.post(`${API_ADDRESS}/api/auth/login`, {
        email: email.value,
        password: password.value
    });
    if (data.result === "negative") {
        errors.value = data.errors as any;
    } else {
        localStorage.setItem(
            "user",
            JSON.stringify({
                name: data.userData?.name,
                surname: data.userData?.surname,
                email: data.userData?.email,
                accessToken: data.tokens?.accessToken,
                refreshToken: data.tokens?.refreshToken
            })
        );
        location.reload();
    }
};
//

//
export default { password, email, handleLogin, errors, emailErrorMessage, passwordErrorMessage, credentialsErrorMessage };
